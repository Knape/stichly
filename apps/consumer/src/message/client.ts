import { createClient, RedisClientType } from "redis";
import environments from "enviroment";

let client: RedisClientType;

export const getRedisClient = async (): Promise<RedisClientType> => {
  if (!client) {
    console.log(`redis://${environments.redisHost}:${environments.redisPort}`);
    client = createClient({
      url: `redis://${environments.redisHost}:${environments.redisPort}`,
    });
    await client.connect();
  }

  return client;
};
