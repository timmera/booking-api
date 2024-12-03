import { PrismaClient } from '@prisma/client';
import NotFoundError from '../../errors/notFoundError.js';

const getAmenityById = async (id) => {
  const prisma = new PrismaClient();
  const amenity = await prisma.amenity.findUnique({
    where: {
      id,
    },
  });

  if (!amenity || !amenity.length === 0) {
    throw new NotFoundError('Amenity', id);
  }

  return amenity;
};

export default getAmenityById;
