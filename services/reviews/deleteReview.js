import { PrismaClient } from '@prisma/client';
import NotFoundError from '../../errors/notFoundError.js';

const deleteReview = async (id) => {
  const prisma = new PrismaClient();

  const deleteReview = await prisma.review.deleteMany({
    where: {
      id,
    },
  });

  if (!deleteReview || deleteReview.count === 0) {
    throw new NotFoundError('Review', id);
  }

  return id;
};
export default deleteReview;
