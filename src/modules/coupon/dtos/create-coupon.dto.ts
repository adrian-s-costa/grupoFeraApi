import { z } from 'zod';

export type CreateCouponDto = z.output<typeof CreateCoupon>;
export const CreateCoupon = z.object({
  value: z.string().optional(),
  emailOwner: z.string().email().optional(),
  pixKey: z.string().min(1),
  discountPercentage: z.string().optional(),
  userId: z.string().optional(),
  validity: z.date().optional(),
  isValid: z.boolean().optional(),
});