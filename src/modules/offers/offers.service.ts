import { config } from 'dotenv';
import Repository from './offers.repository';

function distanceInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // raio da Terra em KM

  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

class Service {    
    public async findAll(lat?: string, lng?: string) {    
        const dealerships = await Repository.getDealerships();

        const placesWithDistance = dealerships
        .map(dealership => ({
            ...dealership,
            distanceKm: Number(
            distanceInKm(
                parseFloat(lat!),
                parseFloat(lng!),
                dealership.coordinates.lat,
                dealership.coordinates.lng
            )
            )
        }))
        .sort((a, b) => a.distanceKm - b.distanceKm);

        return placesWithDistance;
    }

    public async findByCode(storeCode?: string) {    
        const dealerships = await Repository.getDealerships();
        const stores = dealerships.filter(dealership => dealership.storeCode === storeCode);
        return stores ?? []
    }

    public async verifyNotification(location: { lat: number; long: number }, userId: string) {
        
        const closeValue = 0.5; // distância em KM considerada "próxima"
        const dealerships = await Repository.getDealerships();

        const placesWithDistance = dealerships.map(dealership => ({
        ...dealership,
        distanceKm: Number(
            distanceInKm(
                location.lat,
                location.long,
                dealership.coordinates.lat,
                dealership.coordinates.lng
            ).toFixed(2)
        )
        }));

        placesWithDistance.map(async (place)=>{
            const log = await Repository.getNotificationLog(userId, place.id);

            if (!log || !this.isSameDay(log.lastSentAt, new Date())) {
                
                if (place.distanceKm <= closeValue){
                    try {
                        await fetch(
                            "https://onesignal.com/api/v1/notifications",
                            {
                                method: "POST",
                                headers: {
                                    Authorization: `Basic ${process.env.ONE_SIGNAL_API_KEY}`,
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    app_id: "3a2a3d66-11c1-4c83-a061-ff7681dc53d4",
                                    include_external_user_ids: [userId],
                                    contents: {
                                        "pt-BR": `Teste de mensage ${place.name}`,
                                        "en": `Test message ${place.name}`
                                    }
                                })
                            }
                        );
                        await Repository.upsertNotificationLog(userId, place.id);
                        return { status: "OK", message: "enviada" };
                    } catch (err) {
                        console.error(err);
                        return { error: "Erro ao enviar notificação" };
                    }
                }
            }
        })
    }

    public async findById(id: string) {
        return await Repository.getDealershipById(id);
    }

    public async collab() {
        return await Repository.collab();
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