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
  async createPost(userId: string, content: string, mediaUrls: string[], env: any) {
    const prisma = new PrismaClient({
      datasourceUrl: env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
      // Create a post with optional media URLs
      return await prisma.post.create({
        data: {
          userId,
          content,
          media: {
            create: mediaUrls.map((url) => ({ url })),
          },
        },
        include: {
          media: true, // Include media details in the response
        },
      });
    } catch (error) {
      console.error('Post creation error:', error);
      throw new Error('Failed to create post. Please try again later.');
    } finally {
      await prisma.$disconnect();
    }
  },

  async getPosts(userId: string, env: any) {
    const prisma = new PrismaClient({
      datasourceUrl: env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
      // Fetch posts including media and user details
      return await prisma.post.findMany({
        where: {
          userId,
        },
        include: {
          media: true,
          user: {
            select: { id: true, name: true },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      console.error('Error retrieving posts:', error);
      throw new Error('Failed to retrieve posts. Please try again later.');
    } finally {
      await prisma.$disconnect();
    }
  },
};
