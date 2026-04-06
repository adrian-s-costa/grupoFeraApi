import Repository from './coupon.repository';

import AppException from '@errors/app-exception';
import PaginationHelper from '@helpers/pagination.helper';

import { CreateCouponDto } from './dtos/create-coupon.dto';

class Service {
  public async findAll(size: number, page: number, search?: string) {
    const coupons = await Repository.findAll(size, page, search);

    return PaginationHelper.paginate(coupons, size, page);
  }

  public async findAllNoPagination(search?: string) {
    return await Repository.findAllNoPagination(search);
  }

  public async findOne(id: string) {
    const coupon = await Repository.findOne(id);

    if (!coupon) {
      throw new AppException(404, 'Coupon not found');
    }
    return coupon;
  }

  public async createOne(data: CreateCouponDto) {
    return await Repository.createOne(data);
  }

  public async updateOne(id: string, data: Partial<CreateCouponDto>) {
    const coupon = await Repository.findOne(id);
    if (!coupon) {
      throw new AppException(404, 'Coupon not found');
    }
    return await Repository.updateOne(id, data);
  }

  public async deleteOne(id: string) {
    const coupon = await Repository.findOne(id);
    if (!coupon) {
      throw new AppException(404, 'Coupon not found');
    }
    return await Repository.deleteOne(id);
  }
}

export default new Service();