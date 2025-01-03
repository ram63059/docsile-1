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

// import { PrismaClient, Post } from '@prisma/client/edge';
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

//       if (env.REDIS_URL && env.REDIS_TOKEN) {
//         cachedFeed = await cacheService.get(cacheKey, env);
//         if (cachedFeed) return cachedFeed;
//       }

//       const user = await prisma.user.findUnique({ 
//         where: { id: parseInt(userId) } 
//       });

//       if (!user) return [];

//       // Get followed users' posts
//       const followedUserIds = await prisma.follow.findMany({
//         where: { followerId: parseInt(userId) },
//         select: { followingId: true },
//       }).then(follows => follows.map(f => f.followingId));

//       // Get posts by city
//       const cityPosts = user.city ? await prisma.post.findMany({
//         where: { user: { city: user.city } },
//         orderBy: { createdAt: 'desc' },
//         take: 10,
//         include: { user: true, comments: true, likes: true }
//       }) : [];

//       // Get category-specific posts
//       let categoryPosts: Post[] = [];
//       if (user.category === 'student' && user.organisation_name) {
//         categoryPosts = await prisma.post.findMany({
//           where: { user: { organisation_name: user.organisation_name } },
//           orderBy: { createdAt: 'desc' },
//           take: 10,
//           include: { user: true, comments: true, likes: true }
//         });
//       } else if (user.category === 'doctor' && user.specialisation_field_of_study) {
//         categoryPosts = await prisma.post.findMany({
//           where: { user: { specialisation_field_of_study: user.specialisation_field_of_study } },
//           orderBy: { createdAt: 'desc' },
//           take: 10,
//           include: { user: true, comments: true, likes: true }
//         });
//       }

//       // Get followed users' posts
//       const followedPosts = followedUserIds.length ? await prisma.post.findMany({
//         where: { userId: { in: followedUserIds } },
//         orderBy: { createdAt: 'desc' },
//         ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
//         take: 10,
//         include: { user: true, comments: true, likes: true }
//       }) : [];

//       // Combine and deduplicate posts
//       const allPosts = [...cityPosts, ...categoryPosts, ...followedPosts];
//       const uniquePosts = Array.from(new Map(allPosts.map(p => [p.id, p])).values());

//       if (env.REDIS_URL && env.REDIS_TOKEN) {
//         await cacheService.set(cacheKey, uniquePosts, 300, env);
//       }

//       return uniquePosts;
//     } catch (error) {
//       console.error('Feed error:', error);
//       throw error;
//     }
//   },
// };




//4Th version
// feedService.ts: Business logic for retrieving and caching user feed

import { PrismaClient, Post } from '@prisma/client/edge';
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

      // Check cache for existing feed
      if (env.REDIS_URL && env.REDIS_TOKEN) {
        cachedFeed = await cacheService.get(cacheKey, env);
        if (cachedFeed) return cachedFeed;
      }

      // Retrieve user details
      const user = await prisma.user.findUnique({ where: { id: parseInt(userId) } });
      if (!user) return [];

      // Initialize arrays for storing posts
      const citySpecializationPosts: Post[] = [];
      const specializationPosts: Post[] = [];
      const membershipPosts: Post[] = [];
      const followedPosts: Post[] = [];

      // 1. Fetch posts from the user's city, filtered by specialization
      if (user.city) {
        citySpecializationPosts.push(
          ...(await prisma.post.findMany({
            where: { 
              user: { 
                city: user.city, 
                specialisation_field_of_study: user.specialisation_field_of_study 
              } 
            },
            orderBy: { createdAt: 'desc' },
            take: 10,
            include: { user: true, comments: true, likes: true },
          }))
        );
      }

      // 2. Fetch posts related to the user's specialization
      if (user.category === 'student' && user.organisation_name) {
        specializationPosts.push(
          ...(await prisma.post.findMany({
            where: { 
              user: { 
                organisation_name: user.organisation_name, 
                specialisation_field_of_study: user.specialisation_field_of_study 
              } 
            },
            orderBy: { createdAt: 'desc' },
            take: 10,
            include: { user: true, comments: true, likes: true },
          }))
        );
      } else if (user.category === 'doctor') {
        // Field of study
        specializationPosts.push(
          ...(await prisma.post.findMany({
            where: { 
              user: { specialisation_field_of_study: user.specialisation_field_of_study } 
            },
            orderBy: { createdAt: 'desc' },
            take: 10,
            include: { user: true, comments: true, likes: true },
          }))
        );

        // College specialization
        if (user.organisation_name) {
          specializationPosts.push(
            ...(await prisma.post.findMany({
              where: { 
                user: { organisation_name: user.organisation_name } 
              },
              orderBy: { createdAt: 'desc' },
              take: 10,
              include: { user: true, comments: true, likes: true },
            }))
          );
        }
      }

      // 3. Fetch posts from memberships (for doctors)
      if (user.category === 'doctor') {
        const userMemberships = await prisma.memberships.findMany({
          where: { userId: user.id },
          select: { societyname: true }
        });

        if (userMemberships.length) {
          const societyNames = userMemberships
            .map(m => m.societyname)
            .filter((name): name is string => name !== null);  // Filter out nulls

          if (societyNames.length) {
            membershipPosts.push(
              ...(await prisma.post.findMany({
                where: { 
                  user: { 
                    memberships: {
                      some: {
                        societyname: { in: societyNames }
                      }
                    } 
                  } 
                },
                orderBy: { createdAt: 'desc' },
                take: 10,
                include: { user: true, comments: true, likes: true },
              }))
            );
          }
        }
      }

      // 4. Fetch posts from followed users
      const followedUserIds = await prisma.follow.findMany({
        where: { followerId: parseInt(userId) },
        select: { followingId: true },
      }).then(follows => follows.map(f => f.followingId));

      if (followedUserIds.length) {
        followedPosts.push(
          ...(await prisma.post.findMany({
            where: { userId: { in: followedUserIds } },
            orderBy: { createdAt: 'desc' },
            ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
            take: 10,
            include: { user: true, comments: true, likes: true },
          }))
        );
      }

      // Combine and deduplicate posts
      const allPosts = [
        ...citySpecializationPosts, 
        ...specializationPosts, 
        ...membershipPosts, 
        ...followedPosts,
      ];
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
