import Head from "next/head";
import { useRouter } from "next/router";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { ProductCard, ProductList } from "ui";

import { fetchProducts, useProducts } from "../../hooks";

interface IParams {
  id: string;
}

const BrandPage = () => {
  const router = useRouter(); // -> Access Next.js Router here
  const { id } = router.query;
  const brandId = Array.isArray(id) ? id[0] : id;
  const { data, isLoading, isFetching } = useProducts(brandId || "0");
  if (isLoading || isFetching || !data) return;
  const { data: products } = data;
  return (
    <ProductList>
      {products.map((product) => (
        <ProductCard
          imageSrc={product.image || ""}
          title={product.name || ""}
          href={`/products/${product.id}`}
          price={product.prices[0].price}
        />
      ))}
    </ProductList>
  );
};

export async function getServerSideProps({ params }: { params: IParams }) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["products"], () => fetchProducts(params.id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default BrandPage;
