import DataSource from '@database/data-source';
import { Prisma } from '@prisma/client';

class Repository {
  constructor(private readonly repository = DataSource.dealership) {}

    public getDealerships() {
        return this.repository.findMany()
    }

    public getDealershipById(id: any){
        return this.repository.findUnique({
            where: { id }
        })
    }

    public collab(){
        return DataSource.collab.findFirst();
    }

    public async getNotificationLog(userId: string, dealershipId: string) {
        return await DataSource.notificationLog.findUnique({
            where: {
                userId_dealershipId: {
                    userId,
                    dealershipId
                }
            }
        });
    }

    public async upsertNotificationLog(
        userId: string,
        dealershipId: string
    ) {
        return await DataSource.notificationLog.upsert({
            where: {
            userId_dealershipId: {
                userId,
                dealershipId
            }
            },
            update: {
            lastSentAt: new Date()
            },
            create: {
            userId,
            dealershipId,
            lastSentAt: new Date()
            }
        });
    }

    }

export default new Repository();