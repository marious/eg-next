import { useQuery } from 'react-query';
import { CoreApi } from '../utils/core-api';
import { API_ENDPOINTS } from '../utils/endpoints';

const ProductService = new CoreApi(API_ENDPOINTS.PRODUCTS);

// export const fetchProducts = async ({ queryKey }) => {
//     const params = queryKey[1];
//     const response = await ProductService.find(params);
//     console.log('response is', response.data);
//     return response.data;
//     // const fetchedData = response.data ? response.data : null;
//     // return fetchedData;
// };

export const fetchProducts = async () => {
    const { data } = await ProductService.findAll();
    return data;
};

export const fetchProduct = async slug => {
    const { data } = await ProductService.findOne(slug);
    return data.data;
};

export const fetchRelatedProducts = async id => {
    const { data } = await ProductService.findRelated(id);
    return data.data;
};

export const useProductsQuery = () => {
    return useQuery([API_ENDPOINTS.PRODUCTS], fetchProducts);
};
