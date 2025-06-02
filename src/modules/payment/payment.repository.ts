import DataSource from '@database/data-source';

import { Prisma } from '@prisma/client';

class Repository {
  constructor(private readonly repository = DataSource.user) {}

  public async updateOne(email: string, data: Prisma.UserUpdateInput) {
    console.log(email)
    const a = await this.repository.update({
      where: { email },
      data,
    });
    console.log(a)
    return a;
  }

  public async createOne(data: Prisma.SubscriptionCreateInput) {
    return await DataSource.subscription.create({
      data
    });
  }

  public getAll() {
    return DataSource.subscription.findMany();
  }
}

export default new Repository();
