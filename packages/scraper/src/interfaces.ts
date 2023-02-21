export interface IStore {
  url: string;
  name: string;
  brandsPath: string;
  isRetailer: boolean;
}

export interface IBrand {
  url: string;
  name: string;
  description: string | null;
}

export interface IPrice {
  salePrice: number | null;
  price: number;
  discount: number;
  isoDate: string;
}

export interface IProduct {
  name: string | null;
  image: string | null;
  description: string | null;
  details: string | null;
  category: string | null;
  price: number;
  discount: number;
  salePrice: number | null;
  url: string;

  brand?: IBrand | null;
}
