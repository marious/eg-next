import { useQuery } from 'react-query';
import { CoreApi } from '../utils/core-api';
import { API_ENDPOINTS } from '../utils/endpoints';
import request from '../utils/request';

const ProductService = new CoreApi(API_ENDPOINTS.PRODUCTS);

const fetchLatestProducts = async ({ queryKey }) => {
    const [_key, limit, locale] = queryKey;
    if (!limit) {
        limit = 10;
    }
    const url = `${API_ENDPOINTS.LATEST_PRODUCTS}/${limit}`;
    const res = await ProductService.fetchUrl(url, locale);
    return res.data.data;
};

const useLatestProductsQuery = ({ limit, shop_id, locale }) => {
    return useQuery(
        [API_ENDPOINTS.LATEST_PRODUCTS, limit, locale],
        fetchLatestProducts
    );
};

export { useLatestProductsQuery, fetchLatestProducts };
