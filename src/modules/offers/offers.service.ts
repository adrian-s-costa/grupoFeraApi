import Repository from './offers.repository';

class Service {
    public async findAll() {
        const dealerships = await Repository.getDealerships();
        return dealerships;
    }

    public async findById(id: string) {
        return await Repository.getDealershipById(id);
    }
}

export default new Service();