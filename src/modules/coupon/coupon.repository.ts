import DataSource from '@database/data-source';

import { Prisma } from '@prisma/client';
import { CouponDto } from './dtos/coupon.dto';

class Repository {
  constructor(private readonly repository = DataSource.coupon) {}

  public findAll(size: number, page: number, search?: string) {
    const where: Prisma.CouponWhereInput = {
      AND: [
        { OR:
          [
            { value: { contains: search } },
            { emailOwner: { contains: search } },
            { pixKey: { contains: search } },
          ],
        },
      ],
    };

    return DataSource.$transaction([
      this.repository.findMany({
        where,
        take: size,
        skip: ((page - 1) * size),
        select: CouponDto,
        orderBy: { validity: 'desc' },
      }),
      this.repository.count({ where }),
    ]);
  }

  public async findAllNoPagination(search?: string) {
    const where: Prisma.CouponWhereInput = {
      AND: [
        { OR:
          [
            { value: { contains: search } },
            { emailOwner: { contains: search } },
            { pixKey: { contains: search } },
          ],
        },
      ],
    };

    return await this.repository.findMany({
      where,
      select: CouponDto,
      orderBy: { validity: 'desc' },
    });
  }

  public async findOne(id: string) {
    return await this.repository.findUnique({
      where: { id },
      select: CouponDto,
    });
  }

  public async createOne(data: any) {
    return await this.repository.create({
      data,
      select: CouponDto,
    });
  }

  public async updateOne(id: string, data: any) {
    return await this.repository.update({
      where: { id },
      data,
      select: CouponDto,
    });
  }

  public async deleteOne(id: string) {
    return await this.repository.delete({
      where: { id },
      select: CouponDto,
    });
  }
}

export default new Repository();