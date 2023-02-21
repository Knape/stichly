import type { Page } from "puppeteer";
import { getlinks, getlinksAndTitle } from "../../helpers";

/* 
  -- QUERIES FOR THE BRAND PAGE
*/

export const getBrandLinks = async (page: Page) =>
  await getlinksAndTitle(
    page,
    ".instant-brand-page-grid .instant-brand-block-listing-text a"
  );

export const getProductLinks = async (page: Page): Promise<string[]> => {
  return await getlinks(page, ".product-list a.product-info__caption ");
};

export const getNextPageNumber = async (
  page: Page,
  pageNumber: number
): Promise<number | null> => {
  return pageNumber + 1;
};
