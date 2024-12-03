import { PrismaClient } from '@prisma/client';
import NotFoundError from '../../errors/notFoundError.js';

const getUserByUserName = async (username) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findMany({
    where: {
      username: username,
    },
    select: {
      id: true,
      username: true,
      password: false, // Do not return the password
      name: true,
      email: true,
      phoneNumber: true,
      profilePicture: true,
    },
  });

  if (!user || user.length === 0) {
    throw new NotFoundError('User', username);
  }

  return user;
};

export default getUserByUserName;
