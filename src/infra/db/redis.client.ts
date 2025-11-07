import { Redis } from "ioredis";

let redis: Redis | null = null;

export async function connectRedis(): Promise<void> {
  if (redis) return;
  const host = process.env.REDIS_HOST ?? "127.0.0.1";
  const port = Number(process.env.REDIS_PORT ?? 6379);
  redis = new Redis({ host, port });

  await new Promise<void>((resolve, reject) => {
    redis!.on("connect", () => {
      console.log("Connected to Redis");
      resolve();
    });
    redis!.on("error", (err) => {
      console.error("Redis connection error:", err);
      reject(err);
    });
  });
}

export function getRedisClient(): Redis {
  if (!redis) {
    throw new Error("Redis client not initialized. Call connectRedis() first.");
  }
  return redis;
}
