import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/alink';

import { actions as wishlistAction } from '~/store/wishlist';
import { actions as cartAction } from '~/store/cart';
import { actions as compareAction } from '~/store/compare';
import { actions as demoAction } from '~/store/demo';

import { isInWishlist, isInCompare } from '~/utils';

function ProductSix(props) {
    const router = useRouter();
    const { product, wishlist } = props;
    const [maxPrice, setMaxPrice] = useState(0);
    const [minPrice, setMinPrice] = useState(99999);

    useEffect(() => {
        let min = minPrice;
        let max = maxPrice;
        if (product.is_variant) {
            product.variants.map(item => {
                if (min > item.base_price) min = item.base_price;
                if (max < item.base_price) max = item.base_price;
            }, []);
        }

        if (product.is_variant == 0) {
            min = product.base_discounted_price
                ? product.base_discounted_price
                : product.base_price;
            max = product.base_price;
        }

        setMinPrice(min);
        setMaxPrice(max);
    }, []);

    function onCartClick(e) {
        e.preventDefault();
        props.addToCart(product);
    }

    function onWishlistClick(e) {
        e.preventDefault();
        if (!isInWishlist(props.wishlist, product)) {
            props.addToWishlist(product);
        } else {
            router.push('/pages/wishlist');
        }
    }

    function onCompareClick(e) {
        e.preventDefault();
        if (!isInCompare(props.comparelist, product)) {
            props.addToCompare(product);
        }
    }

    function onQuickView(e) {
        e.preventDefault();
        props.showQuickView(product.slug);
    }

    return (
        <div className="product product-5 text-center">
            <figure className="product-media">
                {product.new ? (
                    <span className="product-label label-new">New</span>
                ) : (
                    ''
                )}

                {product.base_discounted_price < product.base_price ? (
                    <span className="product-label label-sale">Sale</span>
                ) : (
                    ''
                )}

                {product.top ? (
                    <span className="product-label label-top">Top</span>
                ) : (
                    ''
                )}

                {!product.stock || product.stock == 0 ? (
                    <span className="product-label label-out">
                        Out of Stock
                    </span>
                ) : (
                    ''
                )}

                <ALink href={`/product/default/${product.slug}`}>
                    <LazyLoadImage
                        alt="product"
                        src={product.thumbnail_image}
                        threshold={500}
                        effect="black and white"
                        wrapperClassName="product-image"
                    />
                </ALink>

                {product.stock > 0 ? (
                    <div className="product-action-vertical">
                        {isInWishlist(wishlist, product) ? (
                            <ALink
                                href="/shop/wishlist"
                                className="btn-product-icon btn-wishlist btn-expandable added-to-wishlist"
                            >
                                <span>go to wishlist</span>
                            </ALink>
                        ) : (
                            <a
                                href="#"
                                className="btn-product-icon btn-wishlist btn-expandable"
                                onClick={onWishlistClick}
                            >
                                <span>add to wishlist</span>
                            </a>
                        )}
                        <a
                            href="#"
                            className="btn-product-icon btn-quickview"
                            title="Quick View"
                            onClick={onQuickView}
                        >
                            <span>quick view</span>
                        </a>
                        <a
                            href="#"
                            className="btn-product-icon btn-compare"
                            onClick={onCompareClick}
                        >
                            <span>compare</span>
                        </a>
                    </div>
                ) : (
                    <div className="product-action-vertical">
                        {isInWishlist(wishlist, product) ? (
                            <ALink
                                href="/shop/wishlist"
                                className="btn-product-icon btn-wishlist btn-expandable added-to-wishlist"
                            >
                                <span>go to wishlist</span>
                            </ALink>
                        ) : (
                            <a
                                href="#"
                                className="btn-product-icon btn-wishlist btn-expandable"
                                onClick={onWishlistClick}
                            >
                                <span>add to wishlist</span>
                            </a>
                        )}
                        <a
                            href="#"
                            className="btn-product-icon btn-quickview"
                            title="Quick View"
                            onClick={onQuickView}
                        >
                            <span>quick view</span>
                        </a>
                        <a
                            href="#"
                            className="btn-product-icon btn-compare"
                            onClick={onCompareClick}
                        >
                            <span>compare</span>
                        </a>
                    </div>
                )}

                {product.stock && product.stock !== 0 ? (
                    <div className="product-action">
                        {product.is_variant ? (
                            <ALink
                                href={`/product/default/${product.slug}`}
                                className="btn-product btn-cart btn-select"
                            >
                                <span>select options</span>
                            </ALink>
                        ) : (
                            <button
                                className="btn-product btn-cart"
                                onClick={onCartClick}
                            >
                                <span>add to cart</span>
                            </button>
                        )}
                    </div>
                ) : (
                    ''
                )}
            </figure>

            <div className="product-body">
                <h3 className="product-title">
                    <ALink href={`/product/default/${product.slug}`}>
                        {product.name}
                    </ALink>
                </h3>

                {!product.stock || product.stock == 0 ? (
                    <div className="product-price">
                        <span className="out-price">
                            ${product.base_price.toFixed(2)}
                        </span>
                    </div>
                ) : minPrice == maxPrice ? (
                    <div className="product-price">${minPrice.toFixed(2)}</div>
                ) : product.is_variant == 0 ? (
                    <div className="product-price">
                        <span className="new-price">
                            ${minPrice.toFixed(2)}
                        </span>
                        <span className="old-price">
                            ${maxPrice.toFixed(2)}
                        </span>
                    </div>
                ) : (
                    <div className="product-price">
                        ${minPrice.toFixed(2)}&ndash;${maxPrice.toFixed(2)}
                    </div>
                )}
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        wishlist: state.wishlist.data,
        comparelist: state.comparelist.data,
    };
};

export default connect(mapStateToProps, {
    ...wishlistAction,
    ...cartAction,
    ...compareAction,
    ...demoAction,
})(ProductSix);
