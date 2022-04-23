import userUser from '~/framework/rest/auth/use-user';
import { useRouter } from 'next/router';
import { authorizationAtom } from '~/store/authorization-atom';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import ALink from '~/components/features/alink';
import LoginForm from '~/components/auth/login-form';
import SignUpForm from '~/components/auth/sign-up-form';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import VendorForm from '~/components/auth/vendor-form';

export default function RegisterShop() {
    return (
        <div className="main">
            <nav className="breadcrumb-nav border-0 mb-0">
                <div className="container"></div>
            </nav>

            <div
                className="login-page bg-image pt-8 pb-8 pt-md-12 pb-md-12 pt-lg-17 pb-lg-17"
                style={{
                    backgroundImage: `url(images/backgrounds/login-bg.jpg)`,
                }}
            >
                <div className="container">
                    <div className="form-box">
                        <div className="form-tab">
                            <Tabs selectedTabClassName="show" defaultIndex={0}>
                                {/* <TabList className="nav nav-pills nav-fill"> */}
                                <h3 className="text-center">
                                    Register As a Vendor
                                </h3>
                                {/* <Tab className="nav-item">
                                        <span className="nav-link">
                                            Sign In
                                        </span>
                                    </Tab>

                                    <Tab className="nav-item">
                                        <span className="nav-link">
                                            Register
                                        </span>
                                    </Tab> */}
                                {/* </TabList> */}

                                <div className="tab-content">
                                    {/* <TabPanel style={{ paddingTop: '2rem' }}> */}
                                    <VendorForm />
                                    {/* </TabPanel> */}
                                </div>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const getStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'forms'])),
        },
    };
};
