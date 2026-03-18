import Repository from './dealership.repository';

class Service {
    public async create(data: {
        name: string;
        description: string;
        address: string;
        distance?: string;
        offerId?: string;
        image: string;
        rating?: number;
        reviews?: number;
        storeCode?: string;
        brandId?: string;
        userId?: string;
        coordinates: { lat: number; lng: number };
    }) {
        return await Repository.create(data);
    }

    public async findAll() {
        return await Repository.findAll();
    }

    public async findById(id: string) {
        return await Repository.findById(id);
    }

    public async findByStoreCode(storeCode: string) {
        return await Repository.findByStoreCode(storeCode);
    }
}

export default new Service();
