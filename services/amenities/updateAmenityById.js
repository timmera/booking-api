import { PrismaClient } from '@prisma/client';
import NotFoundError from '../../errors/notFoundError.js';
import BadRequest from '../../errors/badRequestError.js';

const updateAmenityById = async (id, name) => {
  const prisma = new PrismaClient();
  const updatedAmenity = await prisma.amenity.updateMany({
    where: {
      id,
    },
    data: {
      name,
    },
  });

  if (!name) {
    throw new BadRequest();
  }

  if (!updatedAmenity || updatedAmenity.count === 0) {
    throw new NotFoundError('Amenity', id);
  }

  return {
    message: `Amenity with id ${id} was updated!`,
  };
};

export default updateAmenityById;
