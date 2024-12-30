// feedController.ts: Handles feed-related logic for the application

import { feedService } from '../services/feedService';

export const getFeed = async (c: any) => {
  try {
    const userId = c.req.param('id');
    const cursor = c.req.query('cursor');
    
    console.log('Getting feed for user:', userId);
    console.log('Environment:', c.env);
    
    const feed = await feedService.getFeed(userId, c.env, cursor);
    return c.json({ success: true, feed });
  } catch (error) {
    console.error('Feed error:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "An unknown error occurred" 
    }, 500);
  }
};
