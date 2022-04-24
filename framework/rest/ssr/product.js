import { QueryClient } from 'react-query';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { fetchProduct, fetchRelatedProducts } from '../products/products.query';
import { useRouter } from 'next/router';

export async function getStaticPaths() {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking', //indicates the type of fallback
    };
}

export const getStaticProps = async ({ params, locale }) => {
    const slug = params.slug;

    try {
        const product = await fetchProduct(slug, locale);
        return {
            props: {
                product,
                ...(await serverSideTranslations(locale, [
                    'common',
                    // 'menu',
                    'forms',
                    // 'footer',
                ])),
            },
            revalidate: 60,
        };
    } catch (error) {
        return {
            notfound: true,
        };
    }
};
