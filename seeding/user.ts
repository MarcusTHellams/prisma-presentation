import { type User } from '@prisma/client';
import { join } from 'path';

import getCSV from '../utils/getCSV';
import parseCSV from '../utils/parseCSV';
import { prismaClient } from './../src/prisma/prismaClient';

const main = async () => {
  const csv = await getCSV(join(process.cwd(), 'seeding', 'user.csv'));

  const userJson = parseCSV<User>(csv);
  const users = await prismaClient.user.createMany({
    data: userJson,
  });
  console.log(`Added ${users.count} users to the User Table`);
};

main();
