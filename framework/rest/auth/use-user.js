import { CoreApi } from '../utils/core-api';
import { API_ENDPOINTS } from '../utils/endpoints';
import { authorizationAtom } from '~/store/authorization-atom';
import { useAtom } from 'jotai';
import { useQuery } from 'react-query';

const customerService = new CoreApi(API_ENDPOINTS.USER);
export const fetchMe = async () => {
    const { data } = await customerService.findAll();
    return { me: data };
};

export const useCustomerQuery = options => {
    return useQuery(API_ENDPOINTS.USER, fetchMe, options);
};

const userUser = () => {
    const [isAuthorized] = useAtom(authorizationAtom);
    const { data, isLoading, error } = useCustomerQuery({
        enabled: isAuthorized,
        onError: err => {
            console.log(err);
        },
    });
    return { me: data?.me, loading: isLoading, error };
};

export default userUser;
