export interface IBrand {
  url: string;
  name: string;
}

export interface IPrice {
  sale: number | null;
  price: number;
  discount: number | null;
  isoDate: string;
}

export interface IProduct {
  brand: IBrand | null;
  name: string | null;
  image: string | null;
  prices: IPrice;
  url: string;
}

export interface IProductResult {
  query: string;
  took: number;
  product: any;
}

export interface IQueueItem {
  query: string;
  transactionId: number;
}

export interface ITransaction {
  status: "ON_QUEUE" | "PROCESSING" | "DONE";
  data?: IProductResult;
}
