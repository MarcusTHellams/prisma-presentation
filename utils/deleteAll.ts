import { prismaClient } from './../src/prisma/prismaClient';

const main = async () => {
  await prismaClient.$queryRaw`DELETE from "User"`;
  await prismaClient.$queryRaw`DELETE from "Role"`;
  await prismaClient.$queryRaw`DELETE from "Book"`;
};

main();
