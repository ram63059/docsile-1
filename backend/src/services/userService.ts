// userService.ts: Provides business logic for user operations

import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export const userService = {
  async getUserDetails(userId: string, env: any) {
    const prisma = new PrismaClient({
      datasourceUrl: env.DATABASE_URL,
    }).$extends(withAccelerate());

    return await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      include: { 
        following: true, 
        followers: true,
        post: true,
        comments: true,
        Like: true
      },
    });
  },
};
