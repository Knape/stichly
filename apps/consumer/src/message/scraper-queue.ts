import environments from "enviroment";
import { IQueueItem } from "./interface";
import getChannel from "./rabbitmq";

export enum QueueChannel {
  Product = "product-queue",
  Brand = "brand-queue",
}

export async function consume(
  queue: QueueChannel,
  onQuery: (item: IQueueItem) => Promise<void>
) {
  const channel = await getChannel(queue);
  channel.consume(queue, async (message) => {
    try {
      if (!message) {
        return;
      }
      const item = JSON.parse(message.content.toString()) as IQueueItem;

      await onQuery(item);
    } finally {
      if (message) {
        channel.ack(message);
      }
    }
  });
}
