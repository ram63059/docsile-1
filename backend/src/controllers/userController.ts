// userController.ts: Handles user data and operations

import { userService } from '../services/userService';

export const getUserDetails = async (c: any) => {
  try {
    const userId = c.req.param('id');
    console.log('Getting user details for:', userId);
    
    const user = await userService.getUserDetails(userId, c.env);
    
    if (!user) {
      return c.json({ 
        success: false, 
        error: "User not found" 
      }, 404);
    }

    return c.json({ 
      success: true, 
      user 
    });
  } catch (error) {
    console.error('User details error:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "An unknown error occurred" 
    }, 500);
  }
};
