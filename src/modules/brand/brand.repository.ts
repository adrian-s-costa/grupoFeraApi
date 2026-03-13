import DataSource from '@database/data-source';

class Repository {
    constructor(private readonly repository = DataSource.brand) {}

    public async searchByName(query: string) {
        return await this.repository.findMany({
            where: {
                name: {
                    contains: query,
                    mode: 'insensitive'
                }
            },
            select: {
                id: true,
                name: true,
                emailOwner: true,
                userId: true
            }
        });
    }

    public async create(data: { name: string; emailOwner?: string; userId?: string }) {
        return await this.repository.create({
            data: {
                name: data.name,
                emailOwner: data.emailOwner,
                userId: data.userId
            },
            select: {
                id: true,
                name: true,
                emailOwner: true,
                userId: true
            }
        });
    }
}

export default new Repository();
