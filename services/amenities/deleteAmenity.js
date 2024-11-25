import { PrismaClient } from '@prisma/client';
import NotFoundError from '../../errors/notFoundError.js';

const deleteAmenity = async (id) => {
  const prisma = new PrismaClient();

  const deleteAmenity = await prisma.amenity.deleteMany({
    where: {
      id,
    },
  });

  if (!deleteAmenity || deleteAmenity.count === 0) {
    throw new NotFoundError('Amenity', id);
  }

  return id;
};
export default deleteAmenity;
