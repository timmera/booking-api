import { PrismaClient } from '@prisma/client';

const getUsers = async () => {
  const prisma = new PrismaClient();

  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      password: true,
      name: true,
      email: true,
      phoneNumber: true,
      profilePicture: true,
    },
  });

  if (!users) {
    throw new NotFoundError('User', id);
  }

  return users;
};

export default getUsers;
