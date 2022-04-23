import { useMutation } from 'react-query';
import { AuthService } from './auth.service';

export const useRegisterMutation = input => {
    return useMutation(input => AuthService.register(input));
};

export const useLoginMutation = () => {
    return useMutation(input => AuthService.login(input));
};

export const useRegisterShopMutation = () => {
    return useMutation(input => AuthService.registerShop(input));
};

export const useLogoutMutation = () => {
    return useMutation(() => AuthService.logout());
};
