import { PrismaClient } from '@prisma/client';
import NotFoundError from '../../errors/notFoundError.js';
import BadRequest from '../../errors/badRequestError.js';

const updateReviewById = async (id, userId, propertyId, rating, comment) => {
  const prisma = new PrismaClient();
  const updatedReview = await prisma.review.updateMany({
    where: {
      id,
    },
    data: {
      userId,
      propertyId,
      rating,
      comment,
    },
  });

  // Check if at least one field is provided for update
  if (!userId && !propertyId && !rating && !comment) {
    throw new BadRequest();
  }

  if (!updatedReview || updatedReview.count === 0) {
    throw new NotFoundError('Review', id);
  }

  return {
    message: `Review with id ${id} was updated!`,
  };
};

export default updateReviewById;
