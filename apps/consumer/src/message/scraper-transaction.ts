import { IProductResult, ITransaction } from "./interface";
import { getRedisClient } from "./client";

export const updateTransactionToProcessing = async (
  transactionId: string
): Promise<void> => {
  const redisClient = await getRedisClient();
  await redisClient.set(
    transactionId,
    JSON.stringify({ status: "PROCESSING" } as ITransaction),
    {
      KEEPTTL: true,
    }
  );
};

export const updateTransactionToDone = async (
  transactionId: string,
  result: IProductResult
): Promise<void> => {
  const redisClient = await getRedisClient();
  await redisClient.set(
    transactionId,
    JSON.stringify({ status: "DONE", data: result } as ITransaction),
    { KEEPTTL: true }
  );
};
