import { PrismaClient } from '@prisma/client';
import NotFoundError from '../../errors/notFoundError.js';
import NoValidFormat from '../../errors/noValidFormatError.js';

const getBookingsByUserId = async (userId) => {
  const prisma = new PrismaClient();
  const bookings = await prisma.booking.findMany({
    where: {
      userId,
    },
  });

  // Verify if the userId is correct format
  if (!/^[0-9a-fA-F-]{36}$/.test(userId)) {
    throw new NoValidFormat('Booking with UserId', userId);
  }

  if (!bookings.some((booking) => booking.userId === userId)) {
    throw new NotFoundError('Booking with UserId', userId);
  }

  return bookings;
};

export default getBookingsByUserId;
