import Breadcrumb from '~/components/partials/product/breadcrumb';
import GalleryDefault from '~/components/partials/product/gallery/gallery-default';
import DetailOne from '~/components/partials/product/details/detail-one';
import RelatedProductsOne from '~/components/partials/product/related/related-one';
import request from '~/framework/rest/utils/request';
import { useQuery } from 'react-query';
import { fetchRelatedProducts } from '~/framework/rest/products/products.query';
import { useRouter } from 'next/router';

export { getStaticProps, getStaticPaths } from '~/framework/rest/ssr/product';

function ProductDefault({ product, notfound }) {
    // if (notfound) return <div>Error</div>
    const { locale } = useRouter();

    const {
        data: related,
        isLoading: loadingRelated,
        error,
    } = useQuery(
        `related-product-${product.id}-${locale}`,
        () => fetchRelatedProducts(product.id, locale),
        {
            staleTime: 200000,
        }
    );

    const loading = false;

    return (
        <div className="main">
            <Breadcrumb prev="/" next="/next" current={product.name} />
            <div className="page-content">
                <div className="container skeleton-body">
                    <div className="product-details-top">
                        <div
                            className={`row skel-pro-single ${
                                loading ? '' : 'loaded'
                            }`}
                        >
                            <div className="col-md-6">
                                <div className="skel-product-gallery"></div>
                                {!loading ? (
                                    <GalleryDefault product={product} />
                                ) : (
                                    ''
                                )}
                            </div>

                            <div className="col-md-6">
                                <div className="entry-summary row">
                                    <div className="col-md-12">
                                        <div className="entry-summary1 mt-2 mt-md-0"></div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="entry-summary2"></div>
                                    </div>
                                </div>
                                {!loading ? (
                                    <DetailOne product={product} />
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>
                    </div>

                    {/* {loading ? (
            <div className="skel-pro-tabs"></div>
          ) : (
            <InfoOne product={product} />
          )} */}

                    <RelatedProductsOne
                        products={related}
                        loading={loadingRelated}
                    />
                </div>
            </div>
        </div>
    );
}

export default ProductDefault;
