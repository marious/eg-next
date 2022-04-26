import ALink from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useBrandsQuery } from '~/framework/rest/brand/brands.query';
import {
    useFetchCategoriesQuery,
    useFetchChildCategories,
} from '~/framework/rest/categories/featured-categories-query';
import { useProductsSearchList } from '~/framework/rest/products/products.query';
import PageHeader from '~/components/features/page-header';
import ShopListOne from '~/components/partials/shop/list/shop-list-one';
import StickyBox from 'react-sticky-box';
import ShopSidebarOne from '~/components/partials/shop/sidebar/shop-sidebar-one';
import { useTranslation } from 'react-i18next';
import OwlCarousel from '~/components/features/owl-carousel';
import { brandSlider } from '~/utils/data';

export { getStaticProps } from '~/framework/rest/ssr/products-filter';

export default function Search() {
    const router = useRouter();
    const { t } = useTranslation('common');
    const query = router.query;
    const [type, setType] = useState('3cols');
    const [perPage, setPerPage] = useState(10);
    const [pageTitle, setPageTitle] = useState('List');
    const [toggle, setToggle] = useState(false);
    const [firstLoading, setFirstLoading] = useState(false);

    const { data: brands } = useBrandsQuery(router.locale);
    const { data: categories } = useFetchCategoriesQuery(router.locale);

    // if (query.category) {
    const { data: childCategories, isLoading: childCategoriesLoading } =
        useFetchChildCategories(query.category, router.locale);

    const {
        data: products,
        isLoading: loading,
        error,
    } = useProductsSearchList({
        locale: router.locale,
        category: query.category ? query.category : '',
        keyword: query.keyword ? query.keyword : '',
        brand: query.brand ? query.brand.split(',') : [],
        minPrice: parseInt(query.minPrice) ? parseInt(query.minPrice) : '',
        maxPrice: parseInt(query.maxPrice) ? parseInt(query.maxPrice) : '',
    });

    useEffect(() => {
        window.addEventListener('resize', resizeHandle);
        resizeHandle();
        return () => {
            window.removeEventListener('resize', resizeHandle);
        };
    }, []);

    useEffect(() => {
        if (products) setFirstLoading(true);
    }, [products]);

    function resizeHandle() {
        if (document.querySelector('body').offsetWidth < 992) setToggle(true);
        else setToggle(false);
    }

    function onSortByChange(e) {
        let queryObject = router.query;
        let url = router.pathname.replace('[type]', query.type) + '?';
        for (let key in queryObject) {
            if (key !== 'type' && key !== 'sortBy') {
                url += key + '=' + queryObject[key] + '&';
            }
        }

        router.push(url + 'sortBy=' + e.target.value);
    }

    function toggleSidebar() {
        if (
            document
                .querySelector('body')
                .classList.contains('sidebar-filter-active')
        ) {
            document
                .querySelector('body')
                .classList.remove('sidebar-filter-active');
        } else {
            document
                .querySelector('body')
                .classList.add('sidebar-filter-active');
        }
    }

    function hideSidebar() {
        document
            .querySelector('body')
            .classList.remove('sidebar-filter-active');
    }

    return (
        <main className="main shop">
            <PageHeader title={pageTitle} subTitle="Shop">
                {childCategoriesLoading ? (
                    [0, 1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                        <div className="col-4" key={index}>
                            <div className="skel-pro"></div>
                        </div>
                    ))
                ) : (
                    <OwlCarousel
                        adClass="owl-simple carousel-with-shadow cols-xxl-6 cols-xl-5 cols-lg-4 cols-md-3 cols-xs-2"
                        options={brandSlider}
                    >
                        {childCategories &&
                            childCategories.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="child-category-wrapper"
                                >
                                    <a
                                        href={`/search?category=${item.slug}`}
                                        className="child-element"
                                    >
                                        {item.banner && (
                                            <div
                                                className="child-img"
                                                style={{
                                                    backgroundImage: `url(${item.banner})`,
                                                }}
                                            ></div>
                                        )}
                                        <h3>{item.name}</h3>
                                    </a>
                                </div>
                            ))}
                    </OwlCarousel>
                )}
            </PageHeader>
            <nav className="breadcrumb-nav mb-2">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item">
                            <ALink href="/shop/sidebar/list">Shop</ALink>
                        </li>
                        <li className="breadcrumb-item active">{pageTitle}</li>
                        {query.search ? (
                            <li className="breadcrumb-item">
                                <span>Search - {query.searchTerm}</span>
                            </li>
                        ) : (
                            ''
                        )}
                    </ol>
                </div>
            </nav>

            <div className="page-content">
                <div className="container">
                    <div className="row skeleton-body">
                        <div
                            className={`col-lg-9 skel-shop-products ${
                                !loading ? 'loaded' : ''
                            }`}
                        >
                            <div className="toolbox">
                                <div className="toolbox-left">
                                    {!loading && products ? (
                                        <div className="toolbox-info">
                                            Showing
                                            <span>
                                                {' '}
                                                {products.meta.to} of{' '}
                                                {products.meta.total}
                                            </span>{' '}
                                            Products
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                </div>

                                <div className="toolbox-right">
                                    <div className="toolbox-sort">
                                        <label htmlFor="sortby">
                                            {t('Sort by')} :{' '}
                                        </label>
                                        <div className="select-custom">
                                            <select
                                                name="sortby"
                                                id="sortby"
                                                className="form-control"
                                                onChange={onSortByChange}
                                                value={
                                                    query.sortBy
                                                        ? query.sortBy
                                                        : 'default'
                                                }
                                            >
                                                <option value="default">
                                                    Default
                                                </option>
                                                <option value="featured">
                                                    Most Popular
                                                </option>
                                                <option value="rating">
                                                    Most Rated
                                                </option>
                                                <option value="new">
                                                    Date
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <ShopListOne
                                products={products}
                                perPage={
                                    products &&
                                    loading == false &&
                                    products.meta.per_page
                                }
                                loading={loading}
                            ></ShopListOne>

                            {/* {totalCount > perPage ? (
                                <Pagination
                                    perPage={perPage}
                                    total={totalCount}
                                ></Pagination>
                            ) : (
                                ''
                            )} */}
                        </div>

                        <aside
                            className={`col-lg-3 skel-shop-sidebar order-lg-first skeleton-body ${
                                !loading || firstLoading ? 'loaded' : ''
                            }`}
                        >
                            <div className="skel-widget"></div>
                            <div className="skel-widget"></div>
                            <div className="skel-widget"></div>
                            <div className="skel-widget"></div>
                            <StickyBox
                                className="sticky-content"
                                offsetTop={70}
                            >
                                <ShopSidebarOne
                                    toggle={toggle}
                                    brands={brands}
                                    categories={categories}
                                ></ShopSidebarOne>
                            </StickyBox>
                            {toggle ? (
                                <button
                                    className="sidebar-fixed-toggler"
                                    onClick={toggleSidebar}
                                >
                                    <i className="icon-cog"></i>
                                </button>
                            ) : (
                                ''
                            )}
                            <div
                                className="sidebar-filter-overlay"
                                onClick={hideSidebar}
                            ></div>
                        </aside>
                    </div>
                </div>
            </div>
        </main>
    );
}
