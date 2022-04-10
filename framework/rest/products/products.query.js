import { CoreApi } from "../utils/core-api"
import { API_ENDPOINTS } from "../utils/endpoints"

const ProductService = new CoreApi(API_ENDPOINTS.PRODUCTS)

export const fetchProduct = async (slug) => {
    const { data } = await ProductService.findOne(slug);
    return data.data;
}

export const fetchRelatedProducts = async (id) => {
    const {data} = await ProductService.findRelated(id);
    return data.data;
}