import type { Page } from "puppeteer";
import type { IPrice } from "../interfaces";
import {
  getPrice,
  getText,
  getImage,
  getlinks,
  getlinksAndTitle,
  calculateDiscount,
} from "../helpers";

export const getBrandLinks = async (page: Page) =>
  await getlinksAndTitle(page, "");

export const getNextPageNumber = async (
  page: Page,
  pageNumber: number
): Promise<number | null> => {
  const links = await getlinks(page, "");
  return links.length ? Number(links[0].charAt(links[0].length - 1)) : null;
};

export const getProductLinks = async (page: Page): Promise<string[]> => {
  return await getlinks(page, ".product-list a.product-info__caption ");
};

export const getProductBrand = async (page: Page): Promise<string | null> =>
  await getText(page, ".ca-brand-and-name__brand a");

export const getProductName = async (page: Page): Promise<string | null> =>
  await getText(page, ".ca-brand-and-name__name");

export const getProductImage = async (page: Page): Promise<string | null> =>
  getImage(page, ".ca-image img");

export const getPriceObject = async (page: Page): Promise<IPrice> => {
  const salesPrice = await getPrice(page, ".ca-price--sale .ca-price__selling");
  const comparePrice = await getPrice(
    page,
    ".ca-price--sale .ca-price__regular"
  );
  const originalPrice = await getPrice(page, ".ca-price .ca-price__selling");

  return {
    sale: salesPrice ?? null,
    price: comparePrice || (originalPrice ?? 0),
    discount: calculateDiscount(salesPrice, comparePrice, originalPrice),
    isoDate: new Date().toISOString(),
  };
};
