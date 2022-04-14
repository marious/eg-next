import { QueryClient } from 'react-query';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { dehydrate } from 'react-query/hydration';
import { API_ENDPOINTS } from '~/framework/rest/utils/endpoints';
import { fetchFeaturedCategories } from '../../categories/featured-categories-query';
import { fetchLatestProducts } from '../../products/latest-products.query';

export async function getStaticProps({ locale }) {
    const queryClient = new QueryClient();
    locale = locale ? locale : '';

    await queryClient.prefetchQuery(
        API_ENDPOINTS.LATEST_PRODUCTS,
        fetchLatestProducts,
        {
            staleTime: 60 * 1000,
        }
    );

    await queryClient.prefetchQuery(
        API_ENDPOINTS.FEATURED_CATEGORIES,
        () => fetchFeaturedCategories(locale),
        {
            staleTime: 60 * 1000,
        }
    );

    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
            dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        },
        revalidate: 120,
    };
}
