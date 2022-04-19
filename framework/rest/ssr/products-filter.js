import { QueryClient } from 'react-query';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { dehydrate } from 'react-query/hydration';
import { fetchBrands } from '../brand/brands.query';
import {
    fetchCategories,
    fetchFeaturedCategories,
} from '../categories/featured-categories-query';
import { API_ENDPOINTS } from '../utils/endpoints';

export const getStaticProps = async ({ locale }) => {
    const queryClient = new QueryClient();

    // await queryClient.prefetchQuery(
    //     [API_ENDPOINTS.FEATURED_CATEGORIES, locale],
    //     fetchCategories,
    //     {
    //         staleTime: 60 * 100,
    //     }
    // );

    // await queryClient.prefetchQuery(
    //     [API_ENDPOINTS.ALL_BRANDS, locale],
    //     fetchBrands,
    //     {
    //         staleTime: 60 * 100,
    //     }
    // );

    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'forms'])),
            dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        },
        revalidate: 120,
    };
};
