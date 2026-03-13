import Repository from './brand.repository';

class Service {
    public async searchByName(query: string) {
        return await Repository.searchByName(query);
    }

    public async create(data: { name: string; emailOwner?: string; userId?: string }) {
        return await Repository.create(data);
    }
}

export default new Service();
