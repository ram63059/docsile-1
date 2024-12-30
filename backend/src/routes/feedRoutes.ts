// feedRoutes.ts: Defines feed-related API endpoints

import { Hono } from 'hono';
import { getFeed } from '../controllers/feedController';

const feed = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    REDIS_URL: string;
    REDIS_TOKEN: string;
  }
}>();

feed.get('/:id', getFeed);

export default feed;
