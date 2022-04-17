import { useQuery } from 'react-query';
import { API_ENDPOINTS } from '../utils/endpoints';
import request from '../utils/request';

export const fetchFeaturedCategories = async ({ queryKey }) => {
    const [key, limit, locale] = queryKey;
    const url = `${API_ENDPOINTS.FEATURED_CATEGORIES}`;
    const { data } = await request.get(url, {
        headers: {
            'Accept-Language': locale,
        },
    });
    return data.data;
};

export const fetchCategories = async ({ queryKey }) => {
    const [_key, locale] = queryKey;
    const url = `${API_ENDPOINTS.FEATURED_CATEGORIES}`;
    const { data } = await request.get(url, {
        headers: {
            'Accept-Language': locale,
        },
    });
    return data.data;
};

export const useFeaturedCategoriesQuery = ({ limit, locale }) => {
    return useQuery(
        [API_ENDPOINTS.FEATURED_CATEGORIES, limit, locale],
        fetchFeaturedCategories
    );
};

export const useFetchCategoriesQuery = locale => {
    return useQuery(
        [API_ENDPOINTS.FEATURED_CATEGORIES, locale],
        fetchCategories
    );
};
