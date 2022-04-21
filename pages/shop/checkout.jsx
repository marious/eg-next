import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import SlideToggle from 'react-slide-toggle';

import ALink from '~/components/features/alink';
import Accordion from '~/components/features/accordion/accordion';
import Card from '~/components/features/accordion/card';
import PageHeader from '~/components/features/page-header';

import { cartPriceTotal } from '~/utils/index';
import ShippingDetails from '~/components/checkout/ShippingDetails';
import userUser from '~/framework/rest/auth/use-user';
import { shippingAddressAtom, shippingAmountAtom } from '~/store/order-atom';
import { useAtom } from 'jotai';
import { useAddToCartMutation } from '~/framework/rest/cart/cart.query';
import request from '~/framework/rest/utils/request';
import axios from 'axios';
import { API_ENDPOINTS } from '~/framework/rest/utils/endpoints';

function Checkout(props) {
    const { cartlist } = props;
    const { me } = userUser();
    const [shippingAddress] = useAtom(shippingAddressAtom);
    const [shippingAmount] = useAtom(shippingAmountAtom);
    const [errorMessage, setErroMessage] = useState(false);
    const { mutate: addToCart, isLoading } = useAddToCartMutation();

    useEffect(() => {
        document.querySelector('body').addEventListener('click', clearOpacity);

        return () => {
            document
                .querySelector('body')
                .removeEventListener('click', clearOpacity);
        };
    }, []);

    function clearOpacity() {
        if (document.querySelector('#checkout-discount-input').value == '')
            document
                .querySelector('#checkout-discount-form label')
                .removeAttribute('style');
    }

    function addOpacity(e) {
        e.currentTarget.parentNode
            .querySelector('label')
            .setAttribute('style', 'opacity: 0');
    }

    async function makeOrder() {
        if (!shippingAddress) {
            setErroMessage('Please choose Shpping Address');
            return;
        } else if (shippingAmount === 'no-shipping') {
            setErroMessage('Shipping Region Not Supported');
            return;
        } else {
            async function promises() {
                const ids = [];
                const unresolved = cartlist.map(async item => {
                    const cartData = {
                        qty: item.qty,
                        temp_user_id: null,
                        variation_id: item.variations[0].id,
                    };

                    try {
                        const resp = await request.post(
                            API_ENDPOINTS.ADD_TO_CART,
                            cartData
                        );
                        ids.push(resp.data.data.cart_id);
                    } catch (error) {
                        console.log(error);
                    }
                });

                const resolved = await Promise.all(unresolved);

                try {
                    const responseCart = await request.post(
                        API_ENDPOINTS.CREATE_ORDER,
                        {
                            shipping_address_id: shippingAddress,
                            billing_address_id: shippingAddress,
                            cart_item_ids: ids,
                            delivery_type: 'standard',
                            payment_type: 'cache_on_delivery',
                        }
                    );
                    console.log(responseCart.data);
                } catch (error) {
                    console.log(error);
                }
            }

            promises();
            // async function promises() {
            //     const ids = [];
            //     const unresolved = cartlist.map(async item => {
            //         const res = addToCart(
            //             {
            //                 qty: item.qty,
            //                 temp_user_id: null,
            //                 variation_id: item.variations[0].id,
            //             },
            //             {
            //                 onSuccess: data => {
            //                     console.log('card_id', data.data.cart_id);
            //                     ids.push(data.data.cart_id);
            //                 },
            //             }
            //         );
            //         return ids;
            //     });

            //     const resolved = await Promise.all(unresolved);

            //     console.log(resolved);
            // }

            // promises();
        }
    }

    return (
        <div className="main">
            <PageHeader title="Checkout" subTitle="Shop" />
            <nav className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item">
                            <ALink href="/shop/sidebar/list">Shop</ALink>
                        </li>
                        <li className="breadcrumb-item active">Checkout</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content">
                <div className="checkout">
                    <div className="container">
                        <div className="checkout-discount">
                            <form action="#" id="checkout-discount-form">
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                    id="checkout-discount-input"
                                    onClick={addOpacity}
                                />
                                <label
                                    htmlFor="checkout-discount-input"
                                    className="text-truncate"
                                >
                                    Have a coupon?{' '}
                                    <span>Click here to enter your code</span>
                                </label>
                            </form>
                        </div>

                        {errorMessage && (
                            <div className="alert alert-danger mt-5 mb-5">
                                {errorMessage}
                            </div>
                        )}
                        <div className="row">
                            <ShippingDetails userId={me?.id} />

                            <aside className="col-lg-3">
                                <div className="summary">
                                    <h3 className="summary-title">
                                        Your Order
                                    </h3>

                                    <table className="table table-summary">
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {cartlist.map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        {' '}
                                                        <ALink
                                                            href={`/product/default/${item.slug}`}
                                                        >
                                                            {item.name}
                                                        </ALink>
                                                    </td>
                                                    <td>
                                                        $
                                                        {item.sum.toLocaleString(
                                                            undefined,
                                                            {
                                                                minimumFractionDigits: 2,
                                                                maximumFractionDigits: 2,
                                                            }
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr className="summary-subtotal">
                                                <td>Subtotal:</td>
                                                <td>
                                                    $
                                                    {cartPriceTotal(
                                                        cartlist
                                                    ).toLocaleString(
                                                        undefined,
                                                        {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2,
                                                        }
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Shipping:</td>
                                                <td>
                                                    {shippingAmount == 0
                                                        ? 'Free Shipping'
                                                        : shippingAmount}
                                                </td>
                                            </tr>
                                            <tr className="summary-total">
                                                <td>Total:</td>
                                                <td>
                                                    $
                                                    {shippingAmount !==
                                                    'no-shipping'
                                                        ? (
                                                              cartPriceTotal(
                                                                  cartlist
                                                              ) + shippingAmount
                                                          ).toLocaleString(
                                                              undefined,
                                                              {
                                                                  minimumFractionDigits: 2,
                                                                  maximumFractionDigits: 2,
                                                              }
                                                          )
                                                        : cartPriceTotal(
                                                              cartlist
                                                          ).toLocaleString(
                                                              undefined,
                                                              {
                                                                  minimumFractionDigits: 2,
                                                                  maximumFractionDigits: 2,
                                                              }
                                                          )}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <Accordion type="checkout">
                                        <Card
                                            title="Cash on delivery"
                                            expanded={true}
                                        >
                                            Quisque volutpat mattis eros. Lorem
                                            ipsum dolor sit amet, consectetuer
                                            adipiscing elit. Donec odio. Quisque
                                            volutpat mattis eros.
                                        </Card>

                                        <Card title="Credit Card (Stripe)">
                                            <img
                                                src="images/payments-summary.png"
                                                alt="payments cards"
                                                className="mb-1"
                                            />
                                            Donec nec justo eget felis facilisis
                                            fermentum.Lorem ipsum dolor sit
                                            amet, consectetuer adipiscing elit.
                                            Donec odio. Quisque volutpat mattis
                                            eros. Lorem ipsum dolor sit ame.
                                        </Card>
                                    </Accordion>

                                    <button
                                        type="submit"
                                        className="btn btn-outline-primary-2 btn-order btn-block"
                                        onClick={() => makeOrder()}
                                    >
                                        <span className="btn-text">
                                            Place Order
                                        </span>
                                        <span className="btn-hover-text">
                                            Proceed to Checkout
                                        </span>
                                    </button>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const mapStateToProps = state => ({
    cartlist: state.cartlist.data,
});
Checkout.authenticate = true;
export default connect(mapStateToProps)(Checkout);
