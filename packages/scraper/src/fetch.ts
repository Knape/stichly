import type { Page } from "puppeteer";

import withPage from "./browser";
import {
  getExtenedProduct,
  getPriceProduct,
  getProductLinks,
  getStoreBrands,
} from "./reseller";
import { wait, formatUrl } from "./utils/helpers";
import { sequential } from "./utils/sequential";

import type { IProduct, IBrand, IPrice } from "./interfaces";

/*
  GET BRANDS
*/

export const scrapeBrandsFromStore = async ({
  storeUrl,
  store,
  brandPath,
}: {
  storeUrl: string;
  brandPath: string;
  store: string;
}): Promise<IBrand[]> => {
  return withPage(async (page) => {
    await page.goto(storeUrl + brandPath, { waitUntil: "domcontentloaded" });
    const links = await getStoreBrands(page, store);
    const brands = links.map((link) => ({
      ...link,
      url: formatUrl(link.url, storeUrl),
    }));
    return brands;
  });
};

/*
  GET PRODUCT LINKS FROM BRAND 
*/

const recursiveLink = async (
  page: Page,
  url: string,
  store: string,
  pageNumber: number,
  products: string[]
): Promise<string[]> => {
  try {
    const { hrefs, nextPageNumber } = await getProductLinks(
      page,
      store,
      url,
      pageNumber
    );
    return !hrefs.length || !nextPageNumber
      ? products
      : recursiveLink(page, url, store, nextPageNumber, [
          ...products,
          ...hrefs,
        ]);
  } catch {
    return products;
  }
};

export const scrapeProductLinksFromBrand = async ({
  url,
  storeUrl,
  store,
  delay,
}: {
  url: string;
  storeUrl: string;
  store: string;
  delay?: number;
}): Promise<string[]> => {
  return withPage(async (page) => {
    const products = await recursiveLink(page, url, store, 0, []);
    return products.map((product) => formatUrl(product, storeUrl));
  });
};

const recursivePrice = async (
  page: Page,
  url: string,
  store: string,
  pageNumber: number,
  products: string[]
): Promise<string[]> => {
  try {
    const { hrefs, nextPageNumber } = await getProductLinks(
      page,
      store,
      url,
      pageNumber
    );
    return !hrefs.length || !nextPageNumber
      ? products
      : recursivePrice(page, url, store, nextPageNumber, [
          ...products,
          ...hrefs,
        ]);
  } catch {
    return products;
  }
};

/*
  GET PRODUCTS 
*/

const productItterator =
  (page: Page, url: string, storeName: string, delay?: number) => async () => {
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await wait(delay ?? 0);
    const product = getExtenedProduct(page, storeName, url);
    return Promise.resolve(product);
  };

export const scrapeExtenedProduct = async ({
  url,
  storeUrl,
  store,
  delay,
}: {
  url: string;
  storeUrl: string;
  store: string;
  delay?: number;
}): Promise<IProduct> => {
  return withPage(async (page) => {
    await page.goto(url, { waitUntil: "domcontentloaded" });
    return await getExtenedProduct(page, store, url);
  });
};

export const scrapeExtenedProducts = async ({
  urls,
  store,
  delay,
}: {
  urls: string[];
  store: string;
  delay?: number;
}): Promise<IProduct[]> => {
  return withPage(async (page) => {
    const promises = urls.map((url) =>
      productItterator(page, url, store, delay)
    );
    return await sequential(promises);
  });
};

/*
  GET PRICE 
*/

const PriceItterator =
  (page: Page, url: string, storeName: string, delay?: number) => async () => {
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await wait(delay ?? 0);
    const product = getPriceProduct(page, storeName, url);
    return Promise.resolve(product);
  };

export const scrapePriceProduct = async ({
  url,
  storeUrl,
  store,
  delay,
}: {
  url: string;
  storeUrl: string;
  store: string;
  delay?: number;
}): Promise<IPrice> => {
  return withPage(async (page) => {
    await page.goto(url, { waitUntil: "domcontentloaded" });
    return await getPriceProduct(page, store, url);
  });
};

export const scrapePriceProducts = async ({
  urls,
  store,
  delay,
}: {
  urls: string[];
  store: string;
  delay?: number;
}): Promise<IProduct[]> => {
  return withPage(async (page) => {
    const promises = urls.map((url) =>
      productItterator(page, url, store, delay)
    );
    return await sequential(promises);
  });
};
