import type { Page } from "puppeteer";
import type { IProduct } from "../interfaces";
import * as tresBien from "./tres-bien";
import * as caliroots from "./caliroots";
// import * as kaYo from './ka-yo';
// import * as careOfCarl from './care-of-carl';
// import * as addNature from './add-nature';
// import * as nittyGritty from './nitty-gritty';

export const getStoreConfig = (store: string) => {
  let method = null;
  let stepper = null;
  switch (store) {
    // case 'caliroots':
    //   method = caliroots;
    //   stepper = '?page=';
    //   break;
    case "tres-bien":
      method = tresBien;
      stepper = "?p=";
      break;
    // case 'ka-yo':
    //   method = kaYo;
    //   stepper = '?page=';
    //   break;
    // case 'careofcarl':
    //   method = careOfCarl;
    //   stepper = '?page=';
    //   break;
    // case 'addnature':
    //   method = addNature;
    //   stepper = '?page=';
    //   break;
    // case 'nittygritty':
    //   method = nittyGritty;
    //   break;
    default:
      method = tresBien;
  }
  return {
    method,
    stepper,
  };
};

export const getProduct = async (
  page: Page,
  store: string,
  url: string
): Promise<IProduct> => {
  const { method } = getStoreConfig(store);

  const [name, image, prices] = await Promise.all([
    method.getProductName(page),
    method.getProductImage(page),
    method.getPriceObject(page),
  ]);
  return { url, name, image, prices, brand: null };
};

export const getBrands = async (page: Page, store: string, url: string) => {
  Promise.resolve();
};

export const getProductLink = async (
  page: Page,
  store: string,
  url: string,
  pageNumber: number
): Promise<{ hrefs: string[]; nextPageNumber: number | null }> => {
  const { stepper, method } = getStoreConfig(store);
  const link = `${url}${stepper}${pageNumber}`;
  await page.goto(link, { waitUntil: "domcontentloaded" });
  const hrefs = await method.getProductLinks(page);
  const nextPageNumber = await method.getNextPageNumber(page, pageNumber);
  return { hrefs, nextPageNumber };
};
