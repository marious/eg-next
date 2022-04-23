import { useMutation, useQuery } from 'react-query';
import { API_ENDPOINTS } from '../utils/endpoints';
import { OrderService } from './order.service';

export const useCreateOrderMutation = () => {
    return useMutation(input => OrderService.create(input));
};

export const fetchOrder = async orderId => {
    const { data } = await OrderService.findOne(orderId);
    return {
        order: data.data,
    };
};

export const useOrderQuery = ({ tracking_number }) => {
    return useQuery(['order', tracking_number], () =>
        fetchOrder(tracking_number)
    );
};

const fetchOrders = async ({ queryKey }) => {
    const [_key, params] = queryKey;
    const { page } = params;
    const url = `${API_ENDPOINTS.USER_ORDERS}?page=${page}`;
    const { data: data, ...rest } = await OrderService.fetchUrl(url);
    return {
        orders: data,
    };
};

export const useOrdersQuery = options => {
    return useQuery([API_ENDPOINTS.USER_ORDERS, options], fetchOrders, {
        keepPreviousData: true,
    });
};
