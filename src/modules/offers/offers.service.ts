import Repository from './offers.repository';

type Location = { lat: number; long: number };

function distanceInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

class Service {

  public async verifyNotification(location: Location, userId: string) {
    const closeValueKm = 0.5;
    const dealerships = await Repository.getDealerships();

    for (const dealership of dealerships) {
      const distanceKm = distanceInKm(
        location.lat,
        location.long,
        dealership.coordinates.lat,
        dealership.coordinates.lng
      );

      if (distanceKm > closeValueKm) continue;

      const log = await Repository.getNotificationLog(userId, dealership.id);

      if (log && this.isSameDay(log.lastSentAt, new Date())) {
        continue;
      }

      try {
        await fetch("https://onesignal.com/api/v1/notifications", {
          method: "POST",
          headers: {
            Authorization: `Basic ${process.env.ONE_SIGNAL_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            app_id: process.env.ONE_SIGNAL_APP_ID,
            include_external_user_ids: [userId],
            contents: {
              "pt-BR": `Você está perto da ${dealership.name}`,
              "en": `You're near ${dealership.name}`
            }
          })
        });

        await Repository.upsertNotificationLog(userId, dealership.id);

        // ⛔ envia só UMA notificação por request
        return { status: "OK", dealership: dealership.name };

      } catch (err) {
        console.error("Erro OneSignal:", err);
        return { error: "Erro ao enviar notificação" };
      }
    }

    return { status: "NO_ACTION" };
  }

  private isSameDay(a: Date, b: Date) {
    return (
      a.getUTCFullYear() === b.getUTCFullYear() &&
      a.getUTCMonth() === b.getUTCMonth() &&
      a.getUTCDate() === b.getUTCDate()
    );
  }
}

export default new Service();
