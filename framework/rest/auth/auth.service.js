import { CoreApi } from '../utils/core-api';
import { API_ENDPOINTS } from '../utils/endpoints';

class Auth extends CoreApi {
    login(input) {
        return this.http.post(API_ENDPOINTS.LOGIN, input).then(res => res.data);
    }

    register(input) {
        return this.http
            .post(API_ENDPOINTS.REGISTER, input)
            .then(res => res.data);
    }
}

export const AuthService = new Auth('auth');
