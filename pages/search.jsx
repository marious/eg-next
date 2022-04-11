import ALink from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useBrandsQuery } from '~/framework/rest/brand/brands.query';
import { useFetchCategoriesQuery } from '~/framework/rest/categories/featured-categories-query';
import { useProductsSearchList } from '~/framework/rest/products/products.query';
import PageHeader from '~/components/features/page-header';
import ShopListOne from '~/components/partials/shop/list/shop-list-one';
import StickyBox from 'react-sticky-box';
import ShopSidebarOne from '~/components/partials/shop/sidebar/shop-sidebar-one';

export { getStaticProps } from '~/framework/rest/ssr/products-filter';

export default function Search() {
    const router = useRouter();
    const query = router.query;
    const [type, setType] = useState('3cols');
    const [perPage, setPerPage] = useState(10);
    const [pageTitle, setPageTitle] = useState('List');
    const [toggle, setToggle] = useState(false);
    const [firstLoading, setFirstLoading] = useState(false);

    const { data: brands } = useBrandsQuery();
    const { data: categories } = useFetchCategoriesQuery();

    const {
        data: products,
        isLoading: loading,
        error,
    } = useProductsSearchList({
        category: query.category ? query.category : '',
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
            <PageHeader title={pageTitle} subTitle="Shop" />
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
                                        <label htmlFor="sortby">Sort by:</label>
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
