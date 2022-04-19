import { useMutation } from 'react-query';
import { OrderService } from './order.service';

export const useCreateOrderMutation = () => {
    return useMutation(input => OrderService.create(input));
};
