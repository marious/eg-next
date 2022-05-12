import { CoreApi } from '../utils/core-api';
import { API_ENDPOINTS } from '../utils/endpoints';

class Cart extends CoreApi {
    add(input) {
        input.temp_user_id = this.getTempUserId();
        return this.http
            .post(API_ENDPOINTS.ADD_TO_CART, input)
            .then(res => res.data);
    }

    getTempUserId() {
        if (localStorage.getItem('tempUserId')) {
            return localStorage.getItem('tempUserId');
        }
        const tempUserId = Math.floor(Math.random() * Date.now());
        localStorage.setItem('tempUserId', tempUserId);
    }
}

export const CartService = new Cart('carts');
