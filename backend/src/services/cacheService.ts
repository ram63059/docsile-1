import { Redis } from "@upstash/redis";

// Initialize the Redis client with environment variables from Bindings
const getRedisClient = (env: any) => {
  return new Redis({
    url: env.REDIS_URL,
    token: env.REDIS_TOKEN,
    automaticDeserialization: false
  });
};

export const cacheService = {
  async set(key: string, value: any, ttl: number, env: any) {
    try {
      const redis = getRedisClient(env);
      const serializedValue = JSON.stringify(value);
      await redis.set(key, serializedValue, { ex: ttl });
    } catch (error) {
      console.error('Cache set error:', error);
      // Fail silently - don't let cache errors break the app
    }
  },

  async get(key: string, env: any) {
    try {
      const redis = getRedisClient(env);
      const data = await redis.get(key);
      return data ? JSON.parse(data as string) : null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null; // Return null on cache miss or error
    }
  }
};


