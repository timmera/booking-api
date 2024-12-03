import { PrismaClient } from '@prisma/client';
import NotFoundError from '../../errors/notFoundError.js';
import BadRequest from '../../errors/badRequestError.js';

const updateUserById = async (
  id,
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture
) => {
  const prisma = new PrismaClient();
  const updatedUser = await prisma.user.updateMany({
    where: {
      id,
    },
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
    },
  });

  // Check if at least one field is provided for update
  if (
    !username &&
    !password &&
    !name &&
    !email &&
    !phoneNumber &&
    !profilePicture
  ) {
    throw new BadRequest();
  }

  if (!updatedUser || updatedUser.count === 0) {
    throw new NotFoundError('User', id);
  }

  return {
    message: `User with id ${id} was updated!`,
  };
};

export default updateUserById;
