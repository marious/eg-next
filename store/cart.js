import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { CartService } from '~/framework/rest/cart/cart.service';
import axios from 'axios';

export const actionTypes = {
    addToCart: 'ADD_TO_CART',
    removeFromCart: 'REMOVE_FROM_CART',
    refreshStore: 'REFRESH_STORE',
    updateCart: 'UPDATE_CART',
    clearCart: 'CLEAR_CART',
};

// async function getCartData() {
//     const res = await axios.post('http://egshop.test/api/v1/carts', {
//         temp_user_id: localStorage.getItem('tempUserId'),
//     });
//     return await res.json();
// }

// const cartData = await getCartData();

// console.log('welcome', cartData);

const initialState = {
    data: [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.addToCart:
            var findIndex = state.data.findIndex(
                item => item.id == action.payload.product.id
            );
            let qty = action.payload.qty ? action.payload.qty : 1;
            if (findIndex !== -1 && action.payload.product.is_variant) {
                findIndex = state.data.findIndex(
                    item => item.name == action.payload.product.name
                );
            }

            if (findIndex !== -1) {
                return {
                    data: [
                        ...state.data.reduce((acc, product, index) => {
                            if (findIndex == index) {
                                acc.push({
                                    ...product,
                                    qty: product.qty + qty,
                                    sum:
                                        (action.payload.product
                                            .base_discounted_price
                                            ? action.payload.product
                                                  .base_discounted_price
                                            : action.payload.product
                                                  .base_price) *
                                        (product.qty + qty),
                                });
                            } else {
                                acc.push(product);
                            }

                            return acc;
                        }, []),
                    ],
                };
            } else {
                return {
                    data: [
                        ...state.data,
                        {
                            ...action.payload.product,
                            qty: qty,
                            price: action.payload.product.base_discounted_price
                                ? action.payload.product.base_discounted_price
                                : action.payload.product.base_price,
                            sum:
                                qty *
                                (action.payload.product.base_discounted_price
                                    ? action.payload.product
                                          .base_discounted_price
                                    : action.payload.product.base_price),
                        },
                    ],
                };
            }
        case actionTypes.removeFromCart:
            return {
                data: [
                    ...state.data.filter(item => {
                        if (item.id !== action.payload.product.id) return true;
                        if (item.name !== action.payload.product.name)
                            return true;
                        return false;
                    }),
                ],
            };

        case actionTypes.updateCart:
            return {
                data: [...action.payload.cartItems],
            };
        case actionTypes.clearCart:
            return {
                data: [],
            };
        case actionTypes.refreshStore:
            return initialState;

        default:
            return state;
    }
};

export const actions = {
    addToCart: (product, qty = 1) => ({
        type: actionTypes.addToCart,
        payload: {
            product: product,
            qty: qty,
        },
    }),

    removeFromCart: product => ({
        type: actionTypes.removeFromCart,
        payload: {
            product: product,
        },
    }),

    updateCart: cartItems => ({
        type: actionTypes.updateCart,
        payload: {
            cartItems: cartItems,
        },
    }),
    clearCart: () => ({
        type: actionTypes.clearCart,
        payload: {
            cartItems: [],
        },
    }),
};

export function* cartSaga() {
    yield takeEvery(actionTypes.addToCart, function* saga(e) {
        CartService.add({
            qty: e.payload.qty,
            variation_id: e.payload.product.variations[0].id,
        });
        // CartService.add(e.payload.product);
        toast.success('Product added to Cart');
    });

    yield takeEvery(actionTypes.removeFromCart, function* saga(e) {
        toast.success('Product removed from Cart');
    });

    yield takeEvery(actionTypes.updateCart, function* saga(e) {
        const cartData = e.payload.cartItems;
        console.log('welcome', e);
        toast.success('Cart updated successfully');
    });
}

const persistConfig = {
    keyPrefix: 'molla-',
    key: 'cart',
    storage,
};

export default persistReducer(persistConfig, cartReducer);
