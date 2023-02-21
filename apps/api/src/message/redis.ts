import { createClient, RedisClientType } from "redis";

let client: RedisClientType;

export default async function getRedisClient(): Promise<RedisClientType> {
  if (!client) {
    client = createClient({
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    });
    await client.connect();
  }

  return client;
}
