import { useQuery } from 'react-query';
import { API_ENDPOINTS } from '../utils/endpoints';
import { makeGet } from '../utils/request';

export const fetchStates = async ({ queryKey }) => {
    const [_key, locale] = queryKey;
    const url = `${API_ENDPOINTS.STATES}`;
    const { data } = await makeGet(url, locale);
    return data.data;
};

export const useStatesQuery = locale => {
    return useQuery([API_ENDPOINTS.STATES, locale], fetchStates);
};
