import { useQuery } from 'react-query';
import { API_ENDPOINTS } from '../utils/endpoints';
import request, { makeGet } from '../utils/request';

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

export const fetchChildCategories = async ({ queryKey }) => {
    const [_key, slug, locale] = queryKey;
    const { data } = await makeGet(
        `${API_ENDPOINTS.CHILD_CATEGORIES}/${slug}`,
        locale
    );
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

export const useFetchChildCategories = (slug, locale) => {
    return useQuery(
        [API_ENDPOINTS.CHILD_CATEGORIES, slug, locale],
        fetchChildCategories,
        {
            enabled: slug ? true : false,
        }
    );
};
