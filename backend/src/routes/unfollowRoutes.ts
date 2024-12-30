import { Hono } from 'hono';
import { unfollowUser } from '../controllers/unfollowController';

const unfollowRoutes = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  }
}>();

// Unfollow route
unfollowRoutes.post('/:followingId/:followerId', unfollowUser);

export default unfollowRoutes; 