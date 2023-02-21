import type { Product, Brand } from "database";

import { sendQueryToQueue, QueueChannel } from "../message/scraper-queue";
import { addTransaction } from "../message/scraper-transaction";

const buildQeue = async (item: Product | Brand, queue: QueueChannel) => {
  const transactionId = Date.now();
  await sendQueryToQueue(
    {
      query: String(item.id),
      transactionId,
    },
    queue
  );
  await addTransaction(transactionId.toString());
};

export const updateProductPrices = async (
  products: Product[]
): Promise<void> => {
  const promises = products.map((product) =>
    buildQeue(product, QueueChannel.Product)
  );
  Promise.all(promises);
  return;
};

export const updateBrandProducts = async (brand: Brand): Promise<void> => {
  await buildQeue(brand, QueueChannel.Brand);
  return;
};
