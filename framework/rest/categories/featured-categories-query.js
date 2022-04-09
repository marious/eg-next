import { useQuery } from "react-query";
import { API_ENDPOINTS } from "../utils/endpoints";
import request from "../utils/request";

export const fetchFeaturedCategories = async ({ queryKey }) => {
  const [_key, params] = queryKey;
  const limit = params ? params : 5;
  const url = `${API_ENDPOINTS.FEATURED_CATEGORIES}`;
  const { data } = await request.get(url);
  return data.data;
};

export const useFeaturedCategoriesQuery = ({ limit }) => {
  return useQuery(
    [API_ENDPOINTS.FEATURED_CATEGORIES, limit],
    fetchFeaturedCategories
  );
};
