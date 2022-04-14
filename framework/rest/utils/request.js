import axios from 'axios';
import { getToken } from './get-token';
import { useTranslation } from 'react-i18next';
import document from 'next/document';

// const { locale } = document.documentElement.dir;

const request = axios.create({
    baseURL: process.env.NEXT_PUBLIC_REST_API_ENDPOINT, // TODO: take this api URL from env
    timeout: 30000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // 'Accept-Language': locale,
    },
});

// Change request data/error here
request.interceptors.request.use(
    config => {
        const token = getToken();
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token ? token : ''}`,
        };
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default request;
