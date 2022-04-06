import { QueryClient } from "react-query";
import { wrapper } from "../redux/store";
import { getFeaturedProducts } from "~/redux/actions/productActions.js";
import Home from "~/components/Home";
import {  useLatestProductsQuery } from "~/framework/rest/products/latest-products.query";
import { API_ENDPOINTS } from "~/framework/rest/utils/endpoints";
import axios from "axios";

export default function index({ popularProducts, brands, featuredCategories }) {

  const {data, isLoading, isError} = useLatestProductsQuery({limit: 10});
  console.log(data)


  return (
    <Home
      popularProducts={popularProducts}
      brands={brands}
      featuredCategories={featuredCategories}
    />
  );
}

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async ({ req }) => {
//       await store.dispatch(getFeaturedProducts(req));
//     }
// );

// export const getStaticProps = async () => {
//   try {
//     const popularRes = await axios.get(
//       "http://myshop.test/api/v1/product/latest/10"
//     );
//     return {
//       props: {
//         popularProducts: popularRes.data.data,
//       },
//     };
//   } catch (error) {
//     console.log(error);
//   }
//   // const queryClient = new QueryClient();
//   // await queryClient.prefetchQuery(
//   //   [
//   //     API_ENDPOINTS.POPULAR_PRODUCTS,
//   //     {
//   //       limit: 10,
//   //     },
//   //   ],
//   //   fetchPopularProducts,
//   //   {
//   //     staleTime: 60 * 1000,
//   //   }
//   // );
//   // return {
//   //   props: {
//   //     dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
//   //   },
//   // };
// };
export const getStaticProps = async () => {
  try {
    const popularRes = await axios.get(
      "http://myshop.test/api/v1/product/latest/10"
    );
    const brandsRes = await axios.get("http://myshop.test/api/v1/all-brands");

    const featuredCategories = await axios.get(
      "http://myshop.test/api/v1/categories/featured"
    );

      

    return {
      props: {
        brands: brandsRes.data.data,
        popularProducts: popularRes.data.data,
        featuredCategories: featuredCategories.data.data,
      },
    };
  } catch (error) {
    console.log(error);
  }
};
