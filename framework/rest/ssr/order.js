import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


export const getStaticPaths = async () => {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: true,
    };
}

export const getStaticProps = async ({locale}) => {
    const queryClient = new QueryClient();
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'forms'])),
            dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        },
    };
}