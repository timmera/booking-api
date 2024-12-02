import { PrismaClient } from '@prisma/client';
import BadRequest from '../../errors/badRequestError.js';

const createAmenity = async (name) => {
  const prisma = new PrismaClient();
  if (!name) {
    throw new BadRequest();
  }

  return prisma.amenity.create({
    data: {
      name,
    },
  });
};

export default createAmenity;
