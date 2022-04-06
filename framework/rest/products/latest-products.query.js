import { useQuery } from "react-query";
import { API_ENDPOINTS } from "../utils/endpoints";
import request from "../utils/request";

const fetchLatestProducts = async ({ queryKey }) => {
  const [_key, params] = queryKey;
  const limit = params ? params : 10;
  const url = `${API_ENDPOINTS.LATEST_PRODUCTS}/${limit}`;
  const res = await request.get(url);
  console.log('welcome mohammed',res.data.data);
  return res.data.data;
};

const useLatestProductsQuery = (options = { limit, shop_id }) => {
  return useQuery(
    [API_ENDPOINTS.LATEST_PRODUCTS, options],
    fetchLatestProducts
  );
};

export { useLatestProductsQuery, fetchLatestProducts };
