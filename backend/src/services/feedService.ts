// // feedService.ts: Business logic for retrieving and caching user feed

// import { PrismaClient } from '@prisma/client/edge';
// import { withAccelerate } from '@prisma/extension-accelerate';
// import { cacheService } from './cacheService';

// export const feedService = {
//   async getFeed(userId: string, env: any, cursor?: string) {
//     const prisma = new PrismaClient({
//       datasourceUrl: env.DATABASE_URL,
//     }).$extends(withAccelerate());

//     try {
//       let cachedFeed;
//       const cacheKey = `user:${userId}:feed:${cursor || 'first'}`;

//       // Only try cache if Redis env vars are available
//       if (env.REDIS_URL && env.REDIS_TOKEN) {
//         cachedFeed = await cacheService.get(cacheKey, env);
//         if (cachedFeed) return cachedFeed;
//       }

//       const followedUserIds = (
//         await prisma.user.findUnique({
//           where: { id: parseInt(userId) },
//           include: { 
//             following: {
//               select: { 
//                 followingId: true 
//               }
//             }
//           }
//         })
//       )?.following.map(f => f.followingId);

//       if (!followedUserIds?.length) return [];

//       const posts = await prisma.post.findMany({
//         where: { userId: { in: followedUserIds } },
//         orderBy: { createdAt: 'desc' },
//         ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
//         take: 10,
//         include: { user: true, comments: true, likes: true },
//       });

//       // Only cache if Redis env vars are available
//       if (env.REDIS_URL && env.REDIS_TOKEN) {
//         await cacheService.set(cacheKey, posts, 300, env);
//       }

//       return posts;
//     } catch (error) {
//       console.error('Feed error:', error);
//       throw error;
//     }
//   },
// };






// // feedService.ts: Business logic for retrieving and caching user feed

// import { PrismaClient } from '@prisma/client/edge';
// import { withAccelerate } from '@prisma/extension-accelerate';
// import { cacheService } from './cacheService';

// export const feedService = {
//   async getFeed(userId: string, env: any, cursor?: string) {
//     const prisma = new PrismaClient({
//       datasourceUrl: env.DATABASE_URL,
//     }).$extends(withAccelerate());

//     try {
//       let cachedFeed;
//       const cacheKey = `user:${userId}:feed:${cursor || 'first'}`;

//       // Only try cache if Redis env vars are available
//       if (env.REDIS_URL && env.REDIS_TOKEN) {
//         cachedFeed = await cacheService.get(cacheKey, env);
//         if (cachedFeed) return cachedFeed;
//       }

//       // Retrieve the IDs of users the current user is following
//       const followedUserIds = await prisma.follow.findMany({
//         where: { followerId: parseInt(userId) },
//         select: { followingId: true },
//       }).then((follows) => follows.map((f) => f.followingId));

//       // If the user isn't following anyone, return an empty feed
//       if (!followedUserIds.length) return [];

//       // Retrieve posts from followed users
//       const posts = await prisma.post.findMany({
//         where: { userId: { in: followedUserIds } },
//         orderBy: { createdAt: 'desc' },
//         ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
//         take: 10,
//         include: { 
//           user: true, 
//           comments: true, 
//           likes: true 
//         },
//       });

//       // Cache the feed if Redis is enabled
//       if (env.REDIS_URL && env.REDIS_TOKEN) {
//         await cacheService.set(cacheKey, posts, 300, env); // Cache for 5 minutes
//       }

//       return posts;
//     } catch (error) {
//       console.error('Feed error:', error);
//       throw error;
//     }
//   },
// };









//3RD version


// feedService.ts: Business logic for retrieving and caching user feed

import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { cacheService } from './cacheService';

export const feedService = {
  async getFeed(userId: string, env: any, cursor?: string) {
    const prisma = new PrismaClient({
      datasourceUrl: env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
      let cachedFeed;
      const cacheKey = `user:${userId}:feed:${cursor || 'first'}`;

      // Only try cache if Redis env vars are available
      if (env.REDIS_URL && env.REDIS_TOKEN) {
        cachedFeed = await cacheService.get(cacheKey, env);
        if (cachedFeed) return cachedFeed;
      }

      // Retrieve the IDs of users the current user is following
      const followedUserIds = await prisma.follow.findMany({
        where: { followerId: userId },
        select: { followingId: true },
      }).then((follows) => follows.map((f) => f.followingId));

      // Retrieve posts by user location, specialization, or college (category-specific logic)
      const user = await prisma.user.findUnique({ where: { id: userId } });

      const locationPosts = await prisma.post.findMany({
        where: { user: { location: user?.location } },
        orderBy: { createdAt: 'desc' },
        take: 10,
      });

      let categoryPosts = [];
      if (user?.category === 'student') {
        categoryPosts = await prisma.post.findMany({
          where: { user: { college: user?.college } },
          orderBy: { createdAt: 'desc' },
          take: 10,
        });
      } else if (user?.category === 'doctor') {
        categoryPosts = await prisma.post.findMany({
          where: { user: { specialization: user?.specialization } },
          orderBy: { createdAt: 'desc' },
          take: 10,
        });
      }

      const followedPosts = await prisma.post.findMany({
        where: { userId: { in: followedUserIds } },
        orderBy: { createdAt: 'desc' },
        ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
        take: 10,
        include: {
          user: true,
          comments: true,
          likes: true,
        },
      });

      // Combine and deduplicate posts
      const allPosts = [...locationPosts, ...categoryPosts, ...followedPosts];
      const uniquePosts = Array.from(new Map(allPosts.map((p) => [p.id, p])).values());

      // Cache the feed if Redis is enabled
      if (env.REDIS_URL && env.REDIS_TOKEN) {
        await cacheService.set(cacheKey, uniquePosts, 300, env); // Cache for 5 minutes
      }

      return uniquePosts;
    } catch (error) {
      console.error('Feed error:', error);
      throw error;
    }
  },
};
