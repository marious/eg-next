import { useMutation } from 'react-query';
import { CartService } from './cart.service';

export const useAddToCartMutation = () => {
    return useMutation(input => CartService.add(input));
};
