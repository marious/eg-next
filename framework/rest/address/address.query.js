import { useMutation } from 'react-query';
import { API_ENDPOINTS } from '../utils/endpoints';
import request from '../utils/request';

export const useAddAddressMutation = () => {
    return useMutation(input => {
        return request
            .post(API_ENDPOINTS.CREATE_ADDRESS, input)
            .then(res => res.data);
    });
};
