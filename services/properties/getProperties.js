import { PrismaClient } from '@prisma/client';
import NotFoundError from '../../errors/notFoundError.js';

const getProperties = async (location, pricePerNight, amenities) => {
  const prisma = new PrismaClient();
  const price = parseFloat(pricePerNight);

  const amenitiesArray = Array.isArray(amenities) ? amenities : [amenities];

  try {
    const property = await prisma.property.findMany({
      where: {
        ...(location && { location: { contains: location } }),
        ...(pricePerNight && { pricePerNight: { equals: price } }),
        ...(amenities && {
          amenities: { some: { name: { in: amenitiesArray } } },
        }),
      },
    });
    if (!property || property.length === 0) {
      throw new NotFoundError('Property');
    }

    return property;
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
};

export default getProperties;
