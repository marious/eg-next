import { CoreApi } from '../utils/core-api';
import { API_ENDPOINTS } from '../utils/endpoints';

class Order extends CoreApi {
    constructor(_base_path) {
        super(_base_path);
    }
}

export const OrderService = new Order(API_ENDPOINTS.ORDER);
