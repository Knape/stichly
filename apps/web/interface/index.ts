export type Store = {};

export type Brand = {
  url: string;
  name: string;
};

export type Price = {
  sale: number | null;
  price: number;
  discount: number | null;
  isoDate: string;
};

export type Product = {
  name: string | null;
  image: string | null;
  url: string;
};

export type ProductExtened = {
  id: number;
  brand?: Brand | null;
  store?: Store | null;
  name: string | null;
  image: string | null;
  prices: Price[];
  url: string;
};

export type BrandExtened = {
  id: number;
  url: string;
  name: string;
  store: Store | null;
  products: Product[] | null;
};
