import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createCoupon() {
  const coupon = await prisma.coupon.create({
    data: {
      value: '10', // Example value
      emailOwner: 'example@email.com',
      pixKey: '12345678900', // Required field, example PIX key
      discountPercentage: '10',
      userId: null, // Optional
      validity: new Date('2025-12-31'), // Example validity
      isValid: true,
    },
  });

  console.log('Coupon created:', coupon);
}

createCoupon()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });