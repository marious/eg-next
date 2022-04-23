import { useAtom } from 'jotai';
import Cookies from 'js-cookie';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import PageLoader from '~/components/PageLoader';
import { useLogoutMutation } from '~/framework/rest/auth/auth.query';
import { authorizationAtom } from '~/store/authorization-atom';
import { AUTH_TOKEN } from '~/utils/constants';

export default function Logout() {
    const { mutate } = useLogoutMutation();
    const { pathname, ...router } = useRouter();
    const [, authorize] = useAtom(authorizationAtom);

    useEffect(() => {
        (async () => {
            //   resetCheckout();
            //   await socialLoginSignOut({ redirect: false });
            Cookies.remove(AUTH_TOKEN);
            authorize(false);
            router.push('/');
            // mutate(undefined, {
            //     onSuccess: () => {
            //         Cookies.remove(AUTH_TOKEN);
            //         authorize(false);
            //         router.push('/');
            //     },
            // });
        })();
    }, []);

    return <PageLoader />;
}

export const getStaticProps = ({ locale }) => {
    return {
        props: {
            ...serverSideTranslations(locale, ['common']),
        },
    };
};
