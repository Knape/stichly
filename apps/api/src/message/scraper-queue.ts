// sendQueryToQueue, QueueChannel

import { IQueueItem } from "./interfaces";
import getChannel from "./rabbitmq";

export enum QueueChannel {
  Product = "product-queue",
  Brand = "brand-queue",
}

export async function sendQueryToQueue(
  item: IQueueItem,
  queue: QueueChannel
): Promise<boolean> {
  const channel = await getChannel(queue);
  const message = JSON.stringify(item);
  return channel.sendToQueue(
    queue || process.env.RABBITMQ_QUEUE,
    Buffer.from(message)
  );
}
