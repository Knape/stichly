import type { Page } from "puppeteer";
import type { IPrice } from "../interfaces";
import { getPrice, getText, getlinks, calculateDiscount } from "../helpers";

export const getProductLinks = async (page: Page): Promise<string[]> => {
  return await getlinks(page, ".product-list a.product-info__caption ");
};

export const getNextPageNumber = async (
  page: Page,
  pageNumber: number
): Promise<number | null> => {
  return pageNumber + 1;
};

export const getProductBrand = async (page: Page): Promise<string | null> => {
  return await getText(page, ".vendor");
};
export const getProductName = async (page: Page): Promise<string | null> => {
  return await getText(page, ".product_name");
};
export const getProductImage = async (page: Page): Promise<string | null> =>
  page.$eval(
    ".product-gallery__image",
    (el) => el?.getAttribute("data-zoom-src")?.replace("//", "https://") ?? null
  );

export const getPriceObject = async (page: Page): Promise<IPrice> => {
  console.log("get price");
  const salesPrice = await getPrice(page, ".price--sale .money");
  const comparePrice = await getPrice(page, ".compare-at-price .money");
  const originalPrice = await getPrice(page, ".price .money");

  return {
    sale: salesPrice ?? null,
    price: comparePrice || (originalPrice ?? 0),
    discount: calculateDiscount(salesPrice, comparePrice, originalPrice),
    isoDate: new Date().toISOString(),
  };
};
