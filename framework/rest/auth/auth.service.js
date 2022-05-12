import { CoreApi } from '../utils/core-api';
import { API_ENDPOINTS } from '../utils/endpoints';

class Auth extends CoreApi {
    login(input) {
        if (localStorage.getItem('tempUserId')) {
            input.temp_user_id = localStorage.getItem('tempUserId');
        }
        return this.http.post(API_ENDPOINTS.LOGIN, input).then(res => res.data);
    }

    logout() {
        return this.http.get(API_ENDPOINTS.LOGOUT);
    }

    register(input) {
        return this.http
            .post(API_ENDPOINTS.REGISTER, input)
            .then(res => res.data);
    }

    registerShop(input) {
        return this.http
            .post(API_ENDPOINTS.REGISTER_SHOP, input)
            .then(res => res.data);
    }
}

export const AuthService = new Auth('auth');
