import { useMutation, UseMutationOptions } from 'react-query';
import { AuthService } from './auth.service';

export const useRegisterMutation = input => {
    return useMutation(input => AuthService.register(input));
};

export const useLoginMutation = () => {
    return useMutation(input => AuthService.login(input));
};
