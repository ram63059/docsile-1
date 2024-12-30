// // postRoutes.ts: Routes for managing posts

// import { Hono } from 'hono';
// import { createPost } from '../controllers/postController';

// const postRoutes = new Hono();

// postRoutes.post('/', createPost);

// export default postRoutes;




//2nd Version


// postRoutes.ts: Routes for managing posts

import { Hono } from 'hono';
import { createPost, getPosts } from '../controllers/postController';

const postRoutes = new Hono();

postRoutes.post('/', createPost);
postRoutes.get('/:userId', getPosts); // Added route to fetch posts by userId

export default postRoutes;

