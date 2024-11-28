import { PrismaClient } from '@prisma/client';
import NotFoundError from '../../errors/notFoundError.js';

const getBookingsByUserId = async (userId) => {
  const prisma = new PrismaClient();
  const bookings = await prisma.booking.findMany({
    where: {
      userId,
    },
  });

  if (!userId) {
    throw new NotFoundError('Booking', userId);
  }

  return bookings;
};

export default getBookingsByUserId;
