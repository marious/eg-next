import { CoreApi } from '../utils/core-api';
import { API_ENDPOINTS } from '../utils/endpoints';

class Cart extends CoreApi {
    add(input) {
        return this.http
            .post(API_ENDPOINTS.ADD_TO_CART, input)
            .then(res => res.data);
    }
}

export const CartService = new Cart('carts');
