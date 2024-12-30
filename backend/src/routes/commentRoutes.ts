// commentRoutes.ts: Handles comment-related endpoints

import { Hono } from 'hono';
import { addComment } from '../controllers/commentController';

const comments = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  }
}>();

comments.post('/', addComment);

export default comments;
