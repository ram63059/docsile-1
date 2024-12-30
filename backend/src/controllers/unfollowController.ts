// unfollowController.ts
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export const unfollowUser = async (c: any) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const followerId = c.req.param('followerId');
    const followingId = c.req.param('followingId');

    const unfollow = await prisma.follow.deleteMany({
      where: {
        followerId: parseInt(followerId),
        followingId: parseInt(followingId),
      },
    });

    return c.json({ success: true, message: 'Unfollowed successfully.' });
  } catch (error) {
    console.error('Unfollow error:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "An unknown error occurred" 
    }, 500);
  }
};
   