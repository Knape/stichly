import type { Page } from "puppeteer";

import withPage from "./browser";
import { getProduct, getProductLink } from "./stores/stores";
import { wait } from "./utils/helpers";
import { sequential } from "./utils/sequential";

import type { IProduct } from "./interfaces";

type IReturnProp = Promise<string[]>;

const itterator =
  (page: Page, url: string, storeName: string, delay?: number) => async () => {
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await wait(delay ?? 0);
    const product = getProduct(page, storeName, url);
    return Promise.resolve(product);
  };

const recursive = async (
  page: Page,
  url: string,
  store: string,
  pageNumber: number,
  products: string[]
): IReturnProp => {
  try {
    const { hrefs, nextPageNumber } = await getProductLink(
      page,
      store,
      url,
      pageNumber
    );
    return !hrefs.length || !nextPageNumber
      ? products
      : recursive(page, url, store, nextPageNumber, [...products, ...hrefs]);
  } catch {
    return products;
  }
};

// export const scrapeBrandsFromStore = async (
//   url: string,
//   store: string,
//   delay?: number
// ): IReturnProp => {
//   return withPage(async (page) => {
//     await page.goto(url, { waitUntil: 'domcontentloaded' });
//     await wait(delay ?? 0);
//     return await getBrands(page, store, url);
//   });
// };

export const scrapeProductFromBrand = async (
  url: string,
  storeUrl: string,
  store: string
): IReturnProp => {
  return withPage(async (page) => {
    const products = await recursive(page, url, store, 0, []);
    return products.map(
      (product) => `${storeUrl}${product.replace(storeUrl, "")}`
    );
  });
};

export const scrapeExpandedProduct = async (
  url: string,
  store: string,
  delay?: number
): Promise<IProduct> => {
  return withPage(async (page) => {
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await wait(delay ?? 0);
    return await getProduct(page, store, url);
  });
};

export const scrapeExpandedProducts = async (
  urls: string[],
  store: string,
  delay?: number
): Promise<IProduct[]> => {
  return withPage(async (page) => {
    const promises = urls.map((url) => itterator(page, url, store, delay));
    return await sequential(promises);
  });
};
