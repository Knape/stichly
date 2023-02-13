import type { Page } from "puppeteer";
import type { IPrice } from "../interfaces";
import {
  getPrice,
  getText,
  getImage,
  getlinks,
  calculateDiscount,
} from "../helpers";

export const getProductLinks = async (page: Page): Promise<string[]> => {
  return await getlinks(page, ".product-list a.product-info__caption ");
};

export const getProductBrand = async (page: Page): Promise<string | null> =>
  await getText(page, "a.buybox__brand");

export const getProductName = async (page: Page): Promise<string | null> =>
  await getText(page, ".buybox__title");

export const getProductImage = async (page: Page): Promise<string | null> =>
  getImage(page, ".productImg--wrapper img");

export const getPriceObject = async (page: Page): Promise<IPrice> => {
  const salesPrice = await getPrice(page, ".buybox__price--campaign");
  const comparePrice = await getPrice(page, ".buybox__price--regular--sale");
  const originalPrice = await getPrice(page, ".buybox__price--regular");

  return {
    sale: salesPrice ?? null,
    price: comparePrice || (originalPrice ?? 0),
    discount: calculateDiscount(salesPrice, comparePrice, originalPrice),
    isoDate: new Date().toISOString(),
  };
};
