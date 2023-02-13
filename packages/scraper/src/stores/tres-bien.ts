import type { Page } from "puppeteer";
import type { IPrice } from "../interfaces";
import { getPrice, getText, getlinks, calculateDiscount } from "../helpers";

export const getProductLinks = async (page: Page): Promise<string[]> => {
  return await getlinks(page, ".product-items a.product-item-link");
};

export const getNextPageNumber = async (
  page: Page,
  pageNumber: number
): Promise<number | null> => {
  const links = await getlinks(
    page,
    ".content .pages-items li.pages-item-next a"
  );
  return links.length ? Number(links[0].charAt(links[0].length - 1)) : null;
};

export const getProductBrand = async (page: Page): Promise<string | null> => {
  return await getText(page, ".pdp__more-from-brand a");
};
export const getProductName = async (page: Page): Promise<string | null> => {
  return await getText(page, ".page-title");
};
export const getProductImage = async (page: Page): Promise<string | null> =>
  page.$eval(
    "img.pdp__media-grid-item-image",
    (el) => el?.getAttribute("src") ?? null
  );

export const getPriceObject = async (page: Page): Promise<IPrice> => {
  const salesPrice = await getPrice(page, ".special-price .price");
  const comparePrice = await getPrice(page, ".price-wrapper .price");
  const originalPrice = await getPrice(page, ".price-wrapper .price");

  return {
    sale: salesPrice ?? null,
    price: comparePrice || (originalPrice ?? 0),
    discount: calculateDiscount(salesPrice, comparePrice, originalPrice),
    isoDate: new Date().toISOString(),
  };
};
