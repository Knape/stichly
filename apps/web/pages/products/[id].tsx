import { useState } from "react";
import { useRouter } from "next/router";
import Img from "next/image";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { Button } from "ui";

import { fetchProduct, useProduct } from "../../hooks";

interface IParams {
  id: string;
}

interface IRadioGroup {
  active: boolean;
  checked: boolean;
}

const ProductPage = () => {
  const router = useRouter(); // -> Access Next.js Router here
  const { id } = router.query;
  const productId = Array.isArray(id) ? id[0] : id;
  const { data, isLoading, isFetching, error } = useProduct(productId || "0");
  const product = data?.data;
  if (isLoading || isFetching || error || !product) return;

  return (
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2">
        <div className="group relative">
          <img src={product.image} />
        </div>

        <div className="mt-4 lg:row-span-3 lg:mt-0">
          <h2 className="text-1xl tracking-tight text-gray-900">
            {product.name}
          </h2>
          <p className="text-3xl tracking-tight text-gray-900">
            {product.prices[0].price}
          </p>
          <Button>Add to bag</Button>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ params }: { params: IParams }) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["products"], () => fetchProduct(params.id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default ProductPage;
