import { CoreApi } from '../utils/core-api';
import { API_ENDPOINTS } from '../utils/endpoints';

class Order extends CoreApi {
    constructor(_base_path) {
        super(_base_path);
    }

    create(input) {
        return this.http
            .post(API_ENDPOINTS.CREATE_ORDER, input)
            .then(res => res.data);
    }
}

export const OrderService = new Order(API_ENDPOINTS.ORDER);
