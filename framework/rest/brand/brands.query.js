import { useQuery } from 'react-query';
import { API_ENDPOINTS } from '../utils/endpoints';
import request from '../utils/request';

export const fetchBrands = async ({ queryKey }) => {
    const url = `${API_ENDPOINTS.ALL_BRANDS}`;
    const { data } = await request.get(url);
    return data.data;
};

export const useBrandsQuery = () => {
    return useQuery([API_ENDPOINTS.ALL_BRANDS], fetchBrands);
};
