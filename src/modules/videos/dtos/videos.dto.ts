
import { Prisma } from '@prisma/client';

export const VideosDto = Prisma.validator<Prisma.VideosSelect>()({});
