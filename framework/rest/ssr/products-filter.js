import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { fetchBrands } from '../brand/brands.query';
import {
    fetchCategories,
    fetchFeaturedCategories,
} from '../categories/featured-categories-query';
import { API_ENDPOINTS } from '../utils/endpoints';

export const getStaticProps = async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(
        API_ENDPOINTS.FEATURED_CATEGORIES,
        fetchCategories,
        {
            staleTime: 60 * 100,
        }
    );

    await queryClient.prefetchQuery(API_ENDPOINTS.ALL_BRANDS, fetchBrands, {
        staleTime: 60 * 100,
    });

    return {
        props: {
            dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        },
        revalidate: 120,
    };
};
