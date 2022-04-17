import { useQuery } from 'react-query';
import { API_ENDPOINTS } from '../utils/endpoints';
import { makeGet } from '../utils/request';

export const fetchBrands = async ({ queryKey }) => {
    const [_key, locale] = queryKey;
    const url = `${API_ENDPOINTS.ALL_BRANDS}`;
    const { data } = await makeGet(url, locale);
    return data.data;
};

export const useBrandsQuery = locale => {
    return useQuery([API_ENDPOINTS.ALL_BRANDS, locale], fetchBrands);
};
