import ky from "ky-universal";
import { useQuery } from "@tanstack/react-query";

import type { BrandExtened } from "../../interface";

type RepsonseBrand = {
  data: BrandExtened;
};

type RepsonseBrands = {
  data: BrandExtened[];
};

const fetchBrands = async (): Promise<RepsonseBrands> => {
  return await ky("http://127.0.0.1:3002/api/brands").json();
};

const useBrands = () => {
  return useQuery(["brands"], () => fetchBrands());
};

export { useBrands, fetchBrands };
