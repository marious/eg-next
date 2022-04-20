import userUser from '~/framework/rest/auth/use-user';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { authorizationAtom } from '~/store/authorization-atom';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import ALink from '~/components/features/alink';
import LoginForm from '~/components/auth/login-form';
import SignUpForm from '~/components/auth/sign-up-form';

export default function PrivateRoute({ children }) {
    const router = useRouter();
    const [isAuthorized] = useAtom(authorizationAtom);
    const { me } = userUser();

    const isUser = !!me;

    if (!isUser && !isAuthorized) {
        return (
            <div className="main">
                <nav className="breadcrumb-nav border-0 mb-0">
                    <div className="container">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <ALink href="/">Home</ALink>
                            </li>
                            <li className="breadcrumb-item">
                                <ALink href="#">Pages</ALink>
                            </li>
                            <li className="breadcrumb-item active">Login</li>
                        </ol>
                    </div>
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
                                <Tabs
                                    selectedTabClassName="show"
                                    defaultIndex={0}
                                >
                                    <TabList className="nav nav-pills nav-fill">
                                        <Tab className="nav-item">
                                            <span className="nav-link">
                                                Sign In
                                            </span>
                                        </Tab>

                                        <Tab className="nav-item">
                                            <span className="nav-link">
                                                Register
                                            </span>
                                        </Tab>
                                    </TabList>

                                    <div className="tab-content">
                                        <TabPanel
                                            style={{ paddingTop: '2rem' }}
                                        >
                                            <LoginForm />
                                        </TabPanel>

                                        <TabPanel>
                                            <SignUpForm />
                                        </TabPanel>
                                    </div>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    if (isUser && isAuthorized) {
        return <>{children}</>;
    }

    return <div>Loading....</div>;
}
