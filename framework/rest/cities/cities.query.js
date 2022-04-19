import { useQuery } from 'react-query';
import { API_ENDPOINTS } from '../utils/endpoints';
import { makeGet } from '../utils/request';

export const fetchCities = async ({ queryKey }) => {
    const [_key, state, locale] = queryKey;
    const url = `${API_ENDPOINTS.CITIES}/${state}`;
    const { data } = await makeGet(url, locale);
    return data.data;
};

export const useCitiesQuery = (state, locale) => {
    return useQuery([API_ENDPOINTS.CITIES, state, locale], fetchCities);
};
