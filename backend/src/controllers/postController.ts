// // postController.ts: Handles post creation and retrieval logic

// import { postService } from '../services/postService';

// export const createPost = async (c: any) => {
//   try {
//     const { userId, content } = await c.req.json();
//     const post = await postService.createPost(userId, content, c.env);
//     return c.json({ post });
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       return c.json({ error: error.message }, 500);
//     }
//     return c.json({ error: 'An unknown error occurred' }, 500);
//   }
// };






//2nd version



// postController.ts: Handles post creation and retrieval logic

import { postService } from '../services/postService';

export const createPost = async (c: any) => {
  try {
    const { userId, content, mediaUrls } = await c.req.json(); // Added mediaUrls in the request body

    // Call the service to create a post with media
    const post = await postService.createPost(userId, content, mediaUrls || [], c.env);
    
    return c.json({ post });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json({ error: 'An unknown error occurred' }, 500);
  }
};

export const getPosts = async (c: any) => {
  try {
    const { userId } = c.req.params; // Assume userId is passed as a URL parameter

    // Call the service to fetch posts
    const posts = await postService.getPosts(userId, c.env);

    return c.json({ posts });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json({ error: 'An unknown error occurred' }, 500);
  }
};
