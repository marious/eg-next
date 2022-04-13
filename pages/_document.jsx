import Document, { Html, Head, Main, NextScript } from 'next/document';
import { i18n } from 'next-i18next';
import { getDirection } from '~/utils/get-direction';

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        return await Document.getInitialProps(ctx);
    }

    render() {
        const { locale } = this.props.__NEXT_DATA__;
        if (process.env.NODE_ENV !== 'production') {
            i18n.reloadResources(locale);
        }
        return (
            <Html lang="en" dir={getDirection(locale)}>
                <Head>
                    <base href={process.env.PUBLIC_URL} />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Jost:400,500,600,700,800,900"
                    />
                    <link
                        rel="stylesheet"
                        type="text/css"
                        href="css/bootstrap.min.css"
                    />
                    <link
                        rel="stylesheet"
                        type="text/css"
                        href="css/fonts-molla.min.css"
                    />
                    <link
                        rel="stylesheet"
                        type="text/css"
                        href="vendor/line-awesome/css/line-awesome.min.css"
                    />
                </Head>
                <body>
                    <Main />
                    <script src="js/jquery.min.js"></script>
                    <NextScript />
                </body>
            </Html>
        );
    }
}
