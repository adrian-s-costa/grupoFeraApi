import DataSource from '@database/data-source';

class Repository {
    constructor(private readonly repository = DataSource.dealership) {}

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
        const createData: any = {
            name: data.name,
            description: data.description,
            address: data.address,
            image: data.image,
            coordinates: data.coordinates
        };

        if (data.distance !== undefined) createData.distance = data.distance;
        if (data.offerId !== undefined) createData.offerId = data.offerId;
        if (data.rating !== undefined) createData.rating = data.rating;
        if (data.reviews !== undefined) createData.reviews = data.reviews;
        if (data.storeCode !== undefined) createData.storeCode = data.storeCode;
        if (data.brandId !== undefined) createData.brandId = data.brandId;
        if (data.userId !== undefined) createData.userId = data.userId;

        return await this.repository.create({
            data: createData
        });
    }

    public async findAll() {
        return await this.repository.findMany();
    }

    public async findById(id: string) {
        return await this.repository.findUnique({
            where: { id }
        });
    }

    public async findByStoreCode(storeCode: string) {
        return await this.repository.findMany({
            where: { storeCode }
        });
    }
}

export default new Repository();
