import ky from "ky-universal";
import { useQuery } from "@tanstack/react-query";

import type { ProductExtened } from "../../interface";

type ResponseProduct = {
  data: ProductExtened;
};

type ResponseProducts = {
  data: ProductExtened[];
};

const fetchProduct = async (productId: string): Promise<ResponseProduct> =>
  await ky(`http://127.0.0.1:3002/api/products/${productId}`).json();

const fetchProducts = async (brandId: string): Promise<ResponseProducts> =>
  await ky(`http://127.0.0.1:3002/api/brands/${brandId}/products`).json();

const useProduct = (productId: string) =>
  useQuery(["product", productId], () => fetchProduct(productId));

const useProducts = (brandId: string) =>
  useQuery(["products", brandId], () => fetchProducts(brandId));

export { useProduct, fetchProduct, useProducts, fetchProducts };
