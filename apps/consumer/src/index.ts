// import { PrismaClient } from "database";
// import { scrapeExpandedProduct, scrapeProductFromBrand } from "scraper";
import { QueueChannel, consume } from "./message/scraper-queue";
import {
  updateTransactionToDone,
  updateTransactionToProcessing,
} from "./message/scraper-transaction";
// const prisma = new PrismaClient();

(async () => {
  await consume(QueueChannel.Product, async (item) => {
    console.log("consume product");
    try {
      await updateTransactionToProcessing(item.transactionId.toString());

      // const fetchedProduct = await prisma.product.findUnique({
      //   where: { id: Number(item.query) },
      //   include: { store: true },
      // });

      // if (!fetchedProduct) return;

      // const product = await scrapeExpandedProduct(
      //   fetchedProduct.url,
      //   fetchedProduct.store.name
      // );
      // const { prices, name, image } = product;

      // await prisma.product.update({
      //   where: { id: fetchedProduct.id },
      //   data: { name, image, prices: { createMany: { data: [prices] } } },
      // });
    } catch (error) {
      console.log("error");
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
      // const fetchedBrand = await prisma.brand.findUnique({
      //   where: { id: Number(item.query) },
      //   include: { store: true },
      // });
      // console.log("fetchedBrand", fetchedBrand);
      // if (!fetchedBrand) return;
      // console.log("lets scrape");
      // await updateTransactionToProcessing(item.transactionId.toString());
      // console.log("lets scrape");
      // const productUrls = await scrapeProductFromBrand(
      //   fetchedBrand.url,
      //   fetchedBrand.store.url,
      //   fetchedBrand.store.name
      // );
      // console.log("productUrls", productUrls);
      // const products = productUrls.map((url) => ({
      //   url,
      //   brandId: fetchedBrand.id,
      //   storeId: fetchedBrand.storeId,
      // }));
      // await prisma.$transaction(
      //   products.map((product) =>
      //     prisma.product.upsert({
      //       where: { url: product.url },
      //       update: {},
      //       create: {
      //         url: product.url,
      //         storeId: product.storeId,
      //         brandId: product.brandId,
      //       },
      //     })
      //   )
      // );
    } catch (error) {
      console.log("error");
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
