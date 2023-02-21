import type { Page } from "puppeteer";
import type { IPrice } from "../../interfaces";
import { getPrice, getText, getImage, calculateDiscount } from "../../helpers";

/* 
  -- QUERIES FOR THE PRODUCT PAGE
*/

export const getProductBrand = async (page: Page): Promise<string | null> => {
  return await getText(page, ".vendor");
};
export const getProductName = async (page: Page): Promise<string | null> => {
  return await getText(page, ".product_name");
};
export const getProductImage = async (page: Page): Promise<string | null> => {
  const link = await getImage(page, "img.product-gallery__image");
  return link?.replace("//", "https://") || null;
};

export const getProductDescription = async (
  page: Page
): Promise<string | null> => {
  return Promise.resolve(null);
};

export const getProductDetails = async (page: Page): Promise<string | null> => {
  return Promise.resolve(null);
};

export const getProductCategory = async (
  page: Page
): Promise<string | null> => {
  return Promise.resolve(null);
};

export const getPriceObject = async (page: Page): Promise<IPrice> => {
  const salesPrice = await getPrice(page, ".price--sale .money");
  const comparePrice = await getPrice(page, ".compare-at-price .money");
  const originalPrice = await getPrice(page, ".price .money");

  return {
    salePrice: salesPrice ?? null,
    price: comparePrice || (originalPrice ?? 0),
    discount: calculateDiscount(salesPrice, comparePrice, originalPrice) || 0,
    isoDate: new Date().toISOString(),
  };
};
