import { useEffect, useRef } from 'react';
import Helmet from 'react-helmet';
import { appWithTranslation } from 'next-i18next';
import { useStore } from 'react-redux';
import { Provider } from 'react-redux';
import { Hydrate } from 'react-query/hydration';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useRouter } from 'next/router';

import { wrapper } from '../store/index.js';
import Layout from '../components/layout';

import { actions as demoAction } from '../store/demo';

import '~/public/scss/plugins/owl-carousel/owl.carousel.scss';
import '~/public/scss/style.scss';
import { useFeaturedCategoriesQuery } from '~/framework/rest/categories/featured-categories-query.js';
import { getDirection } from '~/utils/get-direction.js';

const WrappedApp = ({ Component, pageProps }) => {
    const queryClientRef = useRef();
    if (!queryClientRef.current) {
        queryClientRef.current = new QueryClient();
    }

    const { locale } = useRouter();
    const dir = getDirection(locale);

    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout ?? (page => page);

    const store = useStore();
    useEffect(() => {
        if (store.getState().demo.current != process.env.NEXT_PUBLIC_DEMO) {
            store.dispatch(
                demoAction.refreshStore(process.env.NEXT_PUBLIC_DEMO)
            );
        }
        document.documentElement.dir = dir;
        // document.querySelector('body').classList.add(dir);
    }, [dir]);

    return (
        <QueryClientProvider
            client={queryClientRef.current}
            contextSharing={true}
        >
            <Hydrate state={pageProps.dehydratedState}>
                <Provider store={store}>
                    <PersistGate
                        persistor={store.__persistor}
                        loading={
                            <div className="loading-overlay">
                                <div className="bounce-loader">
                                    <div className="bounce1"></div>
                                    <div className="bounce2"></div>
                                    <div className="bounce3"></div>
                                </div>
                            </div>
                        }
                    >
                        <Helmet>
                            <meta
                                httpEquiv="X-UA-Compatible"
                                content="IE=edge"
                            />
                            <meta
                                name="keywords"
                                content="Molla React Template"
                            />
                            <meta
                                name="description"
                                content="Molla –  eCommerce React Template is a multi-use React template. It is designed to go well with multi-purpose websites."
                            />
                            <meta name="author" content="d-themes" />
                            <meta
                                name="apple-mobile-web-app-title"
                                content="Molla"
                            />
                            <meta
                                name="application-name"
                                content="Molla React eCommerce Template"
                            />
                            <meta
                                name="msapplication-TileColor"
                                content="#cc9966"
                            />
                            <meta
                                name="msapplication-config"
                                content="images/icons/browserconfig.xml"
                            />
                            <meta name="theme-color" content="#ffffff" />
                            <title>Molla - React eCommerce Template</title>
                            <link
                                rel="apple-touch-icon"
                                sizes="180x180"
                                href="images/icons/apple-touch-icon.png"
                            />
                            <link
                                rel="icon"
                                type="image/png"
                                sizes="32x32"
                                href="images/icons/favicon-32x32.png"
                            />
                            <link
                                rel="icon"
                                type="image/png"
                                sizes="16x16"
                                href="images/icons/favicon-16x16.png"
                            />
                            <link
                                rel="manifest"
                                href="images/icons/site.webmanifest"
                            />
                            <link
                                rel="mask-icon"
                                href="images/icons/safari-pinned-tab.svg"
                                color="#666666"
                            />
                            <link
                                rel="shortcut icon"
                                href="images/icons/favicon.ico"
                            />
                        </Helmet>

                        <Layout>
                            <div>{getLayout(<Component {...pageProps} />)}</div>
                        </Layout>
                    </PersistGate>
                </Provider>
            </Hydrate>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
};

WrappedApp.getInitialProps = async ({ Component, ctx }) => {
    let pageProps = {};
    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
};

export default appWithTranslation(wrapper.withRedux(WrappedApp));
