import type { Page } from "puppeteer";
import { IBrand } from "./interfaces";

export const getText = async (
  page: Page,
  target: string
): Promise<string | null> => {
  try {
    const textElement = await page.$eval(target, (el) =>
      el.textContent?.replaceAll("\n", " ").replaceAll("  ", " ")?.trim()
    );
    return textElement ?? null;
  } catch (error) {
    return Promise.resolve(null);
  }
};

export const getPrice = async (
  page: Page,
  target: string
): Promise<number | null> => {
  try {
    const numberElement = await page.$eval(target, (el) => {
      return parseInt(
        el?.innerHTML?.replaceAll(" ", "").replace(",", "").replace(":-", "") ??
          "",
        10
      );
    });
    return numberElement ?? null;
  } catch (error) {
    return Promise.resolve(null);
  }
};

export const getImage = async (
  page: Page,
  target: string
): Promise<string | null> => {
  try {
    const imageElement = await page.$eval(
      target,
      (el) => el?.getAttribute("src") ?? null
    );
    return imageElement;
  } catch (error) {
    return Promise.resolve(null);
  }
};

export const getlinks = async (
  page: Page,
  target: string
): Promise<string[]> => {
  try {
    const hrefs = await page.$$eval(target, (element) =>
      element.map((a) => a.getAttribute("href"))
    );
    const sanitizedLinks = hrefs.filter((href) => !!href) as string[];
    return sanitizedLinks;
  } catch (error) {
    return Promise.resolve([]);
  }
};

export const getlinksAndTitle = async (
  page: Page,
  target: string
): Promise<IBrand[]> => {
  try {
    const hrefs = await page.$$eval(target, (element) =>
      element.map((a) => ({
        url: a.getAttribute("href"),
        name:
          a.textContent?.replaceAll("\n", " ").replaceAll("  ", " ")?.trim() ??
          null,
      }))
    );
    const sanitizedLinks = hrefs.filter(
      (href) => !!href.name && !!href.url
    ) as IBrand[];
    return sanitizedLinks;
  } catch (error) {
    return Promise.resolve([]);
  }
};

export const calculateDiscount = (
  salesPrice: number | null,
  comparePrice: number | null,
  originalPrice: number | null
): number | null => {
  const isOnSale = salesPrice && (comparePrice || originalPrice);
  const discount = isOnSale
    ? salesPrice / (comparePrice || (originalPrice ?? 0))
    : 100;
  const discounted = isOnSale ? Math.round(100 - discount * 100) : null;
  return discounted;
};
