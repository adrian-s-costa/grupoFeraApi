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
}

export default new Repository();