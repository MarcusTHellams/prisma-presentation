import {
  randBook,
  randEmail,
  randFirstName,
  randLastName,
  randPastDate,
  randPhrase,
  randRole,
  randUserName,
} from '@ngneat/falso';
import { inspect } from 'util';

import { prismaClient } from './prisma/prismaClient';

export const getUsers = async () => {
  const users = await prismaClient.user.findMany({
    include: {
      books: true,
      roles: {
        include: { role: true },
      },
    },
  });
  console.log(
    '🚀 ~ file: users.ts:14 ~ getUsers ~ users:',
    inspect(users, true, 5, true)
  );
};

export const updateUser = async () => {
  const user: { userId: string; bookId: string }[] =
    await prismaClient.$queryRaw`
   Select "User".id as "userId", "Book".id as "bookId" from "User"
   join "_BookToUser"  ON "User".id = "_BookToUser"."B"
   join "Book" on "_BookToUser"."A" = "Book".id
   ORDER By RANDOM()
   LIMIT 1
  `;

  const firstName = randFirstName();
  console.log('firstName: ', firstName);
  const lastName = randFirstName();
  console.log('lastName: ', lastName);
  const title = randBook().title;
  console.log('title: ', title);

  const updatedUser = await prismaClient.user.update({
    where: {
      id: user[0].userId,
    },
    data: {
      firstName,
      lastName,
      books: {
        update: {
          where: { id: user[0].bookId },
          data: {
            title,
          },
        },
      },
    },
    include: {
      books: {
        where: { id: user[0].bookId },
      },
    },
  });
  console.log(
    '🚀 ~ file: users.ts:32 ~ updateUser ~ updatedUser:',
    inspect(updatedUser, true, 5, true)
  );
};

export const deleteUser = async () => {
  const userToDelete: { id: string }[] = await prismaClient.$queryRaw`
   Select id from "User"
   ORDER By RANDOM()
   LIMIT 1
  `;

  const user = await prismaClient.user.delete({
    where: {
      id: userToDelete[0].id,
    },
    include: {
      books: true,
      roles: true,
    },
  });
  console.log(
    '🚀 ~ file: users.ts:78 ~ deleteUser ~ user:',
    inspect(user, true, 5, true)
  );
};

export const addUserWithBookAndRole = async () => {
  const newUser = await prismaClient.user.create({
    data: {
      firstName: randFirstName(),
      lastName: randLastName(),
      email: randEmail(),
      username: randUserName(),
      password: 'password',
      books: {
        create: {
          title: randBook().title,
          publicationDate: randPastDate().toISOString(),
        },
      },
      roles: {
        create: {
          role: {
            create: {
              title: randRole(),
              description: randPhrase(),
            },
          },
        },
      },
    },
    include: {
      books: true,
      roles: {
        include: { role: true },
      },
    },
  });
  console.log(
    '🚀 ~ file: users.ts:125 ~ addUserWithBookAndRole ~ newUser:',
    inspect(newUser, true, 5, true)
  );
};
