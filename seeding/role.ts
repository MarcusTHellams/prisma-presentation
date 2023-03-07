import { type Role } from '@prisma/client';
import { join } from 'path';

import getCSV from '../utils/getCSV';
import parseCSV from '../utils/parseCSV';
import { prismaClient } from './../src/prisma/prismaClient';

const main = async () => {
  try {
    const users = await prismaClient.user.findMany();
    const csv = await getCSV(join(process.cwd(), 'seeding', 'role.csv'));

    const roleJson = parseCSV<Role>(csv);
    await Promise.allSettled(
      roleJson.map(async (role) => {
        const _role = await prismaClient.role.create({
          data: {
            ...role,
          },
        });

        await prismaClient.rolesOnUsers.createMany({
          data: [
            {
              roleId: _role.id,
              userId: users[Math.floor(Math.random() * users.length)].id,
            },
            {
              roleId: _role.id,
              userId: users[Math.floor(Math.random() * users.length)].id,
            },
            {
              roleId: _role.id,
              userId: users[Math.floor(Math.random() * users.length)].id,
            },
            {
              roleId: _role.id,
              userId: users[Math.floor(Math.random() * users.length)].id,
            },
            {
              roleId: _role.id,
              userId: users[Math.floor(Math.random() * users.length)].id,
            },
          ],
        });
        return _role;
      })
    );
    console.log(`Added ${roleJson.map((role) => role.title).join(', ')} to db`);
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

main();
