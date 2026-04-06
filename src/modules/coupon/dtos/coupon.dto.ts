import { Prisma } from '@prisma/client';

export const CouponDto = Prisma.validator<Prisma.CouponSelect>()({
  id: true,
  value: true,
  emailOwner: true,
  pixKey: true,
  discountPercentage: true,
  userId: true,
  validity: true,
  isValid: true,
  couponUsages: true,
});