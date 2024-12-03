import { PrismaClient } from '@prisma/client';
import NotFoundError from '../../errors/notFoundError.js';
import BadRequest from '../../errors/badRequestError.js';

const updatePropertyById = async (
  id,
  hostId,
  title,
  description,
  location,
  pricePerNight,
  bedRoomCount,
  bathRoomCount,
  maxGuestCount,
  rating
) => {
  const prisma = new PrismaClient();
  const updatedProperty = await prisma.property.updateMany({
    where: {
      id,
    },
    data: {
      hostId,
      title,
      description,
      location,
      pricePerNight,
      bedRoomCount,
      bathRoomCount,
      maxGuestCount,
      rating,
    },
  });

  // Check if at least one field is provided for update
  if (
    !hostId &&
    !title &&
    !description &&
    !location &&
    !pricePerNight &&
    !bedRoomCount &&
    !bathRoomCount &&
    !maxGuestCount &&
    !rating
  ) {
    throw new BadRequest();
  }

  if (!updatedProperty || updatedProperty.count === 0) {
    throw new NotFoundError('Property', id);
  }

  return {
    message: `Property with id ${id} was updated!`,
  };
};

export default updatePropertyById;
