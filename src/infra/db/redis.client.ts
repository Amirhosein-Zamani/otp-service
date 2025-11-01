import { Redis } from "ioredis";

let redis: Redis | null = null;

export async function connectRedis(): Promise<void> {
    if (redis) return;
    const host = process.env.REDIS_HOST ?? '127.0.0.1';
    const port = Number(process.env.REDIS_PORT ?? 6379);
    redis = new Redis({ host, port });
}

export function getRedisClient(): Redis {
    if (!redis) {
        throw new Error('Redis client not initialized. Call connectRedis() first.');
    }
    return redis;
}