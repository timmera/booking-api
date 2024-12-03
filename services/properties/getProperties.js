import { PrismaClient } from '@prisma/client';
import NotFoundError from '../../errors/notFoundError.js';

const getProperties = async (location, pricePerNight, amenities) => {
  //const price = parseFloat(pricePerNight);
  const prisma = new PrismaClient();
  const price = parseFloat(pricePerNight);
  const property = await prisma.property.findMany({
    where: {
      ...(location && { location: { contains: location } }),
      ...(pricePerNight && { pricePerNight: { equals: price } }),
      ...(amenities && { amenities: { contains: amenities } }),
    },
  });
  if (!property || property.length === 0) {
    throw new NotFoundError('Property');
  }

  return property;
};
export default getProperties;
