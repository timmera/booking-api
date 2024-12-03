import { PrismaClient } from '@prisma/client';
import BadRequest from '../../errors/badRequestError.js';

const createProperty = async (
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
  if (
    !hostId ||
    !title ||
    !description ||
    !location ||
    !pricePerNight ||
    !bedRoomCount ||
    !bathRoomCount ||
    !maxGuestCount ||
    !rating
  ) {
    throw new BadRequest();
  }
  return prisma.property.create({
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
};

export default createProperty;
