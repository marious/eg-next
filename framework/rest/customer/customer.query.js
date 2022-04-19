import { useQuery } from 'react-query';
import { API_ENDPOINTS } from '../utils/endpoints';
import request from '../utils/request';

export const fetchAddreses = async ({ queryKey }) => {
    const url = `${API_ENDPOINTS.ADDRESSES}`;
    const { data } = await request.get(url);
    return data.data;
};

export const useCustomerAddressesQuery = () => {
    return useQuery([API_ENDPOINTS.ADDRESSES], fetchAddreses);
};
