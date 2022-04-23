import { useRouter } from 'next/router';
import NewOrder from '~/components/orders/NewOrder';
import PageLoader from '~/components/PageLoader';

export { getStaticPaths, getStaticProps } from '~/framework/rest/ssr/order';

export default function OrderPage() {
    const router = useRouter();

    // If the page is not yet generated, this will be displayed
    // initially until getStaticProps() finishes running

    if (router.isFallback) {
        return <PageLoader />;
    }
    return <NewOrder />;
}

OrderPage.authenticate = true;
