// followRoutes.ts
import { Hono } from 'hono';
import { followUser } from '../controllers/followController';
import { unfollowUser } from '../controllers/unfollowController';

const followRoutes = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  }
}>();

// Follow route
followRoutes.post('/:followingId/:followerId', followUser);

export default followRoutes;
