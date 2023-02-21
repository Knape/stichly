import type { Page } from "puppeteer";
import type { IProduct, IBrand, IPrice } from "../interfaces";
// import * as tresBien from "./tres-bien";
import * as caliroots from "./caliroots";
// import * as kaYo from "./ka-yo";
// import * as careOfCarl from './care-of-carl';
// import * as addNature from './add-nature';
// import * as nittyGritty from './nitty-gritty';

export const getStoreConfig = (store: string) => {
  let method = null;
  let stepper = null;
  switch (store) {
    case "caliroots":
      method = caliroots;
      stepper = "?page=";
      break;
    // case "tres-bien":
    //   method = tresBien;
    //   stepper = "?p=";
    //   break;
    // case "ka-yo":
    //   method = kaYo;
    //   stepper = "?page=";
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
      method = caliroots;
  }
  return {
    method,
    stepper,
  };
};

export const getExtenedProduct = async (
  page: Page,
  store: string,
  url: string
): Promise<IProduct> => {
  const { method } = getStoreConfig(store);

  const [name, image, description, details, category, prices] =
    await Promise.all([
      method.getProductName(page),
      method.getProductImage(page),
      method.getProductDescription(page),
      method.getProductDetails(page),
      method.getProductCategory(page),
      method.getPriceObject(page),
    ]);

  const { price, discount, salePrice } = prices;

  return {
    url,
    name,
    image,
    description,
    details,
    category,
    price,
    discount,
    salePrice,
  };
};

export const getPriceProduct = async (
  page: Page,
  store: string,
  url: string
): Promise<IPrice> => {
  const { method } = getStoreConfig(store);
  const price = await method.getPriceObject(page);
  return price;
};

export const getStoreBrands = async (
  page: Page,
  store: string
): Promise<IBrand[]> => {
  const { method } = getStoreConfig(store);
  return await method.getBrandLinks(page);
};

export const getProductLinks = async (
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
