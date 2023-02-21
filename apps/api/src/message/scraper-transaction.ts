// addTransaction

import { ITransaction } from "./interfaces";
import getRedisClient from "./redis";

export const addTransaction = async (transactionId: string): Promise<void> => {
  const redisClient = await getRedisClient();
  await redisClient.set(
    transactionId,
    JSON.stringify({ status: "ON_QUEUE" } as ITransaction),
    {
      EX: 15 * 60,
    }
  );
};
