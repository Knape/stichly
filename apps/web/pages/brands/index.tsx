import Head from "next/head";
import Link from "next/link";
import { dehydrate, QueryClient } from "@tanstack/react-query";

import { fetchBrands, useBrands } from "../../hooks";

interface IParams {
  id: string;
}

const BrandsPage = () => {
  const { data: brands, isLoading, isFetching } = useBrands();
  console.log("brands", brands);

  if (isFetching || isLoading) return;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {brands.data.map((brand) => (
            <div key={brand.id} className="group relative">
              <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                {/* <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                /> */}
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link href={`/brands/${brand.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {brand.name}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["brands"], () => fetchBrands());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default BrandsPage;
