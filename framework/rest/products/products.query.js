import { useQuery } from 'react-query';
import { CoreApi } from '../utils/core-api';
import { API_ENDPOINTS } from '../utils/endpoints';

const ProductService = new CoreApi(API_ENDPOINTS.PRODUCTS);

export const fetchProductsForSearchedList = async ({ queryKey }) => {
    const params = queryKey[1];
    const response = await ProductService.find(params);
    return response.data;
    // const fetchedData = response.data ? response.data : null;
    // return fetchedData;
};

export const fetchProducts = async () => {
    const { data } = await ProductService.findAll();
    return data;
};

export const fetchProduct = async (slug, locale = 'en') => {
    const { data } = await ProductService.findOne(slug, locale);
    return data.data;
};

export const fetchRelatedProducts = async (id, locale = 'en') => {
    const { data } = await ProductService.findRelated(id, locale);
    return data.data;
};

export const useProductsQuery = () => {
    return useQuery([API_ENDPOINTS.PRODUCTS], fetchProducts);
};

export const useProductsSearchList = options => {
    return useQuery(
        [API_ENDPOINTS.PRODUCTS, options],
        fetchProductsForSearchedList
    );
};
