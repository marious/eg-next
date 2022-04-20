import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/alink';

import { safeContent } from '~/utils';
import { useProductsSearchList } from '~/framework/rest/products/products.query';
import { useTranslation } from 'react-i18next';

function HeaderSearch() {
    const router = useRouter();
    const { t } = useTranslation('common');
    const [cat, setCat] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);

    const {
        data,
        isLoading: loading,
        error,
    } = useProductsSearchList({
        keyword: searchTerm,
        locale: router.locale,
    });

    const result = data && data.data;
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        document
            .querySelector('body')
            .addEventListener('click', closeSearchForm);

        return () => {
            document
                .querySelector('body')
                .removeEventListener('click', closeSearchForm);
        };
    }, []);

    // useEffect(() => {
    //     if (result && searchTerm.length > 2)
    //         setProducts(
    //             result.reduce((acc, product) => {
    //                 let max = 0;
    //                 let min = 999999;
    //                 product.variants.map(item => {
    //                     if (min > item.price) min = item.price;
    //                     if (max < item.price) max = item.price;
    //                 }, []);

    //                 if (product.variants.length == 0) {
    //                     min = product.sale_price
    //                         ? product.sale_price
    //                         : product.price;
    //                     max = product.price;
    //                 }

    //                 return [
    //                     ...acc,
    //                     {
    //                         ...product,
    //                         minPrice: min,
    //                         maxPrice: max,
    //                     },
    //                 ];
    //             }, [])
    //         );
    // }, [result, searchTerm]);

    // useEffect(() => {
    //     if (searchTerm.length > 2) {
    //         if (timer) clearTimeout(timer);
    //         let timerId = setTimeout(() => {
    //             searchProducts({
    //                 variables: {
    //                     searchTerm: searchTerm,
    //                     category: cat,
    //                 },
    //             });
    //         }, 500);
    //         setTimer(timerId);
    //     }
    // }, [searchTerm, cat]);

    useEffect(() => {
        document.querySelector('.header-search.show-results') &&
            document
                .querySelector('.header-search.show-results')
                .classList.remove('show-results');
    }, [router.pathname]);

    function matchEmphasize(name) {
        let regExp = new RegExp(searchTerm, 'i');
        return name.replace(regExp, match => '<strong>' + match + '</strong>');
    }

    function closeSearchForm(e) {
        document
            .querySelector('.header .header-search')
            .classList.remove('show');
    }

    function onCatSelect(e) {
        setCat(e.target.value);
    }

    function onSearchChange(e) {
        setSearchTerm(e.target.value);
    }

    function showSearchForm(e) {
        document.querySelector('.header .header-search').classList.add('show');
    }

    function onSubmitSearchForm(e) {
        e.preventDefault();
        router.push({
            pathname: '/search',
            query: {
                keyword: searchTerm,
                category: cat,
            },
        });
    }

    function goProductPage() {
        setSearchTerm('');
        setProducts([]);
    }

    return (
        <div className="header-search header-search-extended header-search-visible header-search-no-radius d-none d-lg-block">
            <button className="search-toggle">
                <i className="icon-search"></i>
            </button>

            <form
                action="#"
                method="get"
                onSubmit={onSubmitSearchForm}
                onClick={showSearchForm}
            >
                <div className="header-search-wrapper search-wrapper-wide">
                    <label
                        htmlFor="q"
                        className="sr-only"
                        value={searchTerm}
                        required
                    >
                        Search
                    </label>
                    <input
                        type="text"
                        onChange={onSearchChange}
                        value={searchTerm}
                        className="form-control"
                        name="q"
                        placeholder={t('Search Product ...')}
                        required
                        autoComplete="off"
                    />
                    <button className="btn btn-primary" type="submit">
                        <i className="icon-search"></i>
                    </button>
                    <div className="live-search-list" onClick={goProductPage}>
                        {result && searchTerm.length > 2 ? (
                            <div className="autocomplete-suggestions">
                                {searchTerm.length > 2 &&
                                    result.map((product, index) => (
                                        <ALink
                                            href={`/product/default/${product.slug}`}
                                            className="autocomplete-suggestion"
                                            key={`search-result-${index}`}
                                        >
                                            <LazyLoadImage
                                                src={product.thumbnail_image}
                                                width={40}
                                                height={40}
                                                alt="product"
                                            />
                                            <div
                                                className="search-name"
                                                dangerouslySetInnerHTML={safeContent(
                                                    matchEmphasize(product.name)
                                                )}
                                            ></div>
                                            <span className="search-price">
                                                {product.stock == 0 ? (
                                                    <div className="product-price mb-0">
                                                        <span className="out-price">
                                                            $
                                                            {product.base_price.toFixed(
                                                                2
                                                            )}
                                                        </span>
                                                    </div>
                                                ) : product.base_discounted_price ==
                                                  product.base_price ? (
                                                    <div className="product-price mb-0">
                                                        $
                                                        {product.base_discounted_price.toFixed(
                                                            2
                                                        )}
                                                    </div>
                                                ) : product.is_variant == 0 ? (
                                                    <div className="product-price mb-0">
                                                        <span className="new-price">
                                                            $
                                                            {product.base_discounted_price.toFixed(
                                                                2
                                                            )}
                                                        </span>
                                                        <span className="old-price">
                                                            $
                                                            {product.base_price.toFixed(
                                                                2
                                                            )}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <div className="product-price mb-0">
                                                        $
                                                        {product.base_discounted_price.toFixed(
                                                            2
                                                        )}
                                                        &ndash;$
                                                        {product.base_price.toFixed(
                                                            2
                                                        )}
                                                    </div>
                                                )}
                                            </span>
                                        </ALink>
                                    ))}
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}

export default HeaderSearch;
