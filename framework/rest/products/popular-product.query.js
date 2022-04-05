import { useQuery } from "react-query";
import { API_ENDPOINTS } from "../utils/endpoints";
import request from "../utils/request";

const fetchPopularProducts = async ({ queryKey }) => {
  const [_key, params] = queryKey;
  const limit = 10;
  const url = `${API_ENDPOINTS.LATEST_PRODUCTS}/${limit}`;
  const res = await request.get(url, {
    "Content-Type": "application/json",
  });

  console.log(res.data.data);
  return res.data.data;
};

const usePopularProductsQuery = (options = { limit, shop_id }) => {
  return useQuery(
    [API_ENDPOINTS.LATEST_PRODUCTS, options],
    fetchPopularProducts
  );
};

export { usePopularProductsQuery, fetchPopularProducts };
