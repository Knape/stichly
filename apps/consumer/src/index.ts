import { PrismaClient } from "database";
import {
  scrapeExtenedProduct,
  scrapePriceProduct,
  scrapeProductLinksFromBrand,
} from "scraper";
import { QueueChannel, consume } from "./message/scraper-queue";
import {
  updateTransactionToDone,
  updateTransactionToProcessing,
} from "./message/scraper-transaction";
const prisma = new PrismaClient();

(async () => {
  await consume(QueueChannel.Product, async (item) => {
    try {
      await updateTransactionToProcessing(item.transactionId.toString());

      const fetchedProduct = await prisma.product.findUnique({
        where: { id: Number(item.query) },
        include: { store: true },
      });

      if (!fetchedProduct) return;

      const product = await scrapeExtenedProduct({
        url: fetchedProduct.url,
        storeUrl: fetchedProduct.store.url,
        store: fetchedProduct.store.name,
      });
      const priceHistory = await scrapePriceProduct({
        url: fetchedProduct.url,
        storeUrl: fetchedProduct.store.url,
        store: fetchedProduct.store.name,
      });

      const { price, discount, salePrice, name, image } = product;
      await prisma.product.update({
        where: { id: fetchedProduct.id },
        data: {
          name,
          image,
          price,
          discount,
          salePrice,
          priceHistory: { createMany: { data: [priceHistory] } },
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      await updateTransactionToDone(item.transactionId.toString(), {
        query: item.query,
        product: "product",
        took: (Date.now() - item.transactionId) / 1000,
      });
    }
  });

  await consume(QueueChannel.Brand, async (item) => {
    try {
      const fetchedBrand = await prisma.brand.findUnique({
        where: { id: Number(item.query) },
        include: { store: true },
      });
      if (!fetchedBrand) return;
      await updateTransactionToProcessing(item.transactionId.toString());
      const productUrls = await scrapeProductLinksFromBrand({
        url: fetchedBrand.url,
        storeUrl: fetchedBrand.store.url,
        store: fetchedBrand.store.name,
      });
      const products = productUrls.map((url) => ({
        url,
        brandId: fetchedBrand.id,
        storeId: fetchedBrand.storeId,
      }));
      await prisma.$transaction(
        products.map((product) =>
          prisma.product.upsert({
            where: { url: product.url },
            update: {},
            create: {
              url: product.url,
              storeId: product.storeId,
              brandId: product.brandId,
            },
          })
        )
      );
    } catch (error) {
      console.log(error);
    } finally {
      await updateTransactionToDone(item.transactionId.toString(), {
        query: item.query,
        product: "product",
        took: (Date.now() - item.transactionId) / 1000,
      });
    }
  });
})();
