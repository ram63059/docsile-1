import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export const likeService = {
  async addLike(userId: string, postId: string, env: any) {
    const prisma = new PrismaClient({
      datasourceUrl: env.DATABASE_URL,
    }).$extends(withAccelerate());

    return prisma.like.create({
      data: { 
        userId: parseInt(userId), 
        postId 
      },
    });
  },

  async removeLike(userId: string, postId: string, env: any) {
    const prisma = new PrismaClient({
      datasourceUrl: env.DATABASE_URL,
    }).$extends(withAccelerate());

    return prisma.like.deleteMany({
      where: { 
        userId: parseInt(userId), 
        postId 
      },
    });
  },

  async getLikesForPost(postId: string, env: any) {
    const prisma = new PrismaClient({
      datasourceUrl: env.DATABASE_URL,
    }).$extends(withAccelerate());

    return prisma.like.findMany({
      where: { postId },
      include: { user: true },
    });
  }
};
