// userRoutes.ts: Manages user-related API endpoints

import { Hono } from 'hono';
import { getUserDetails } from '../controllers/userController';

const users = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  }
}>();

users.get('/:id', getUserDetails);

export default users;
