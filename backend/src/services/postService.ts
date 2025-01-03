// // postService.ts: Handles post creation and retrieval logic

// import { PrismaClient } from '@prisma/client/edge';
// import { withAccelerate } from '@prisma/extension-accelerate';

// export const postService = {
//   async createPost(userId: string, content: string, env: any) {
//     const prisma = new PrismaClient({
//       datasourceUrl: env.DATABASE_URL,
//     }).$extends(withAccelerate());

//     try {
//       return await prisma.post.create({
//         data: { 
//           userId: parseInt(userId), 
//           content 
//         },
//       });
//     } catch (error) {
//       console.error('Post creation error:', error);
//       throw error;
//     }
//   },
// };





//2ND version

// postService.ts: Handles post creation and retrieval logic

import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export const postService = {
  async createPost(userId: string, content: string, mediaUrl: string, env: any) {
    const prisma = new PrismaClient({
      datasourceUrl: env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
      return await prisma.post.create({
        data: {
          userId: parseInt(userId),
          content,
          mediaUrl,
        },
        include: {
          user: true,
          comments: true,
          likes: true
        },
      });
    } catch (error) {
      console.error('Post creation error:', error);
      throw new Error('Failed to create post. Please try again later.');
    }
  },

  async getPosts(userId: string, env: any) {
    const prisma = new PrismaClient({
      datasourceUrl: env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
      return await prisma.post.findMany({
        where: {
          userId: parseInt(userId),
        },
        include: {
          user: true,
          comments: true,
          likes: true
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      console.error('Error retrieving posts:', error);
      throw new Error('Failed to retrieve posts. Please try again later.');
    }
  },
};
