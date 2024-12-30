

  // errorHandler.ts: Utility for centralized error handling

export const errorHandler = (error: any, context: any) => {
    console.error('Error:', error.message || error);
    context.json({ error: error.message || 'An unexpected error occurred' }, 500);
  };
  