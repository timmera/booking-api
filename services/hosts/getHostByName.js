import { PrismaClient } from '@prisma/client';
import NotFoundError from '../../errors/notFoundError.js';

const getHostByName = async (name) => {
  const prisma = new PrismaClient();
  const host = await prisma.host.findMany({
    where: {
      name: name,
    },
  });

  if (!host || host.length === 0) {
    throw new NotFoundError('Host', name);
  }

  return host;
};

export default getHostByName;
