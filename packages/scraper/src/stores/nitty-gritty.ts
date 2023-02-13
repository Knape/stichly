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
  await getText(page, ".viewmore-list li:nth-child(3) a");

export const getProductName = async (page: Page): Promise<string | null> =>
  await getText(page, ".product-name-ctr h1");

export const getProductImage = async (page: Page): Promise<string | null> =>
  getImage(page, ".product-image.main-image img");

export const getPriceObject = async (page: Page): Promise<IPrice> => {
  const salesPrice = await getPrice(
    page,
    ".product-price-ctr .product-price .has-promo-price .price-sales"
  );
  const comparePrice = await getPrice(
    page,
    ".product-price-ctr .price-standard .retail-price"
  );
  const originalPrice = await getPrice(
    page,
    ".product-price-ctr .product-price .price-sales"
  );

  return {
    sale: salesPrice ?? null,
    price: comparePrice || (originalPrice ?? 0),
    discount: calculateDiscount(salesPrice, comparePrice, originalPrice),
    isoDate: new Date().toISOString(),
  };
};
