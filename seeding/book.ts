import { type Book } from '@prisma/client';
import { join } from 'path';

import { prismaClient } from '../src/prisma/prismaClient';
import getCSV from '../utils/getCSV';
import parseCSV from '../utils/parseCSV';

const main = async () => {
  try {
    const users = await prismaClient.user.findMany();
    const csv = await getCSV(join(process.cwd(), 'seeding', 'book.csv'));

    const bookJson = parseCSV<Book>(csv);
    await Promise.allSettled(
      bookJson.map((book) => {
        return prismaClient.book.create({
          data: {
            ...book,
            author: {
              connect: [
                { id: users[Math.floor(Math.random() * users.length)].id },
                { id: users[Math.floor(Math.random() * users.length)].id },
                { id: users[Math.floor(Math.random() * users.length)].id },
                { id: users[Math.floor(Math.random() * users.length)].id },
                { id: users[Math.floor(Math.random() * users.length)].id },
              ],
            },
          },
        });
      })
    );
    console.log(`Added ${bookJson.map((book) => book.title).join(', ')} to db`);
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

main();
