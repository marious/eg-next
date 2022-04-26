import React from 'react';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';

import ALink from '~/components/features/alink';
import PageHeader from '~/components/features/page-header';
import UserOrders from '~/components/orders/UserOrders';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ShippingDetails from '~/components/checkout/ShippingDetails';
import userUser from '~/framework/rest/auth/use-user';

function DashBoard() {
    const { me } = userUser();

    function toOrder(e) {
        e.preventDefault();
        document
            .querySelector(
                '.nav-dashboard .react-tabs__tab-list .nav-item:nth-child(2)'
            )
            .click();
    }

    function toAddress(e) {
        e.preventDefault();
        document
            .querySelector(
                '.nav-dashboard .react-tabs__tab-list .nav-item:nth-child(4)'
            )
            .click();
    }

    function toAccount(e) {
        e.preventDefault();
        document
            .querySelector(
                '.nav-dashboard .react-tabs__tab-list .nav-item:nth-child(5)'
            )
            .click();
    }

    return (
        <div className="main">
            <PageHeader title="My Account" subTitle="Shop" />
            <nav className="breadcrumb-nav mb-3">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item">
                            <ALink href="/shop/sidebar/list">Shop</ALink>
                        </li>
                        <li className="breadcrumb-item active">My Account</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content">
                <div className="dashboard">
                    <div className="container">
                        <ul
                            className="nav nav-dashboard flex-column mb-3 mb-md-0"
                            role="tablist"
                        >
                            <Tabs selectedTabClassName="active show">
                                <div className="row">
                                    <aside className="col-md-4 col-lg-3 mb-md-0 mb-2">
                                        <TabList>
                                            <Tab className="nav-item">
                                                <span className="nav-link">
                                                    Dashboard
                                                </span>
                                            </Tab>

                                            <Tab className="nav-item">
                                                <span className="nav-link">
                                                    Orders
                                                </span>
                                            </Tab>

                                            <Tab className="nav-item">
                                                <span className="nav-link">
                                                    Addresses
                                                </span>
                                            </Tab>

                                            <Tab className="nav-item">
                                                <span className="nav-link">
                                                    Account Details
                                                </span>
                                            </Tab>

                                            <Tab className="nav-item">
                                                <ALink
                                                    href="/logout"
                                                    className="nav-link"
                                                >
                                                    Sign Out
                                                </ALink>
                                            </Tab>
                                        </TabList>
                                    </aside>

                                    <div
                                        className="col-md-8 col-lg-9"
                                        style={{ marginTop: '1rem' }}
                                    >
                                        <div className="tab-pane">
                                            <TabPanel>
                                                <p>
                                                    Hello{' '}
                                                    <span className="font-weight-normal text-dark">
                                                        User
                                                    </span>{' '}
                                                    (not{' '}
                                                    <span className="font-weight-normal text-dark">
                                                        User
                                                    </span>
                                                    ?{' '}
                                                    <ALink href="/">
                                                        Log out
                                                    </ALink>
                                                    )
                                                    <br />
                                                    From your account dashboard
                                                    you can view your{' '}
                                                    <a
                                                        href="#tab-orders"
                                                        onClick={toOrder}
                                                        className="tab-trigger-link link-underline"
                                                    >
                                                        recent orders
                                                    </a>
                                                    , manage your{' '}
                                                    <a
                                                        href="#tab-address"
                                                        onClick={toAddress}
                                                        className="tab-trigger-link"
                                                    >
                                                        shipping and billing
                                                        addresses
                                                    </a>
                                                    , and{' '}
                                                    <a
                                                        href="#tab-account"
                                                        onClick={toAccount}
                                                        className="tab-trigger-link"
                                                    >
                                                        edit your password and
                                                        account details
                                                    </a>
                                                    .
                                                </p>
                                            </TabPanel>

                                            <TabPanel>
                                                <UserOrders />
                                            </TabPanel>

                                            <TabPanel>
                                                <p>
                                                    The following addresses will
                                                    be used on the checkout page
                                                    by default.
                                                </p>

                                                <div className="row">
                                                    <ShippingDetails />
                                                </div>
                                            </TabPanel>

                                            <TabPanel>
                                                <form action="#">
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <label>
                                                                First Name *
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                required
                                                            />
                                                        </div>

                                                        <div className="col-sm-6">
                                                            <label>
                                                                Last Name *
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                required
                                                            />
                                                        </div>
                                                    </div>

                                                    <label>
                                                        Display Name *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        required
                                                    />
                                                    <small className="form-text">
                                                        This will be how your
                                                        name will be displayed
                                                        in the account section
                                                        and in reviews
                                                    </small>

                                                    <label>
                                                        Email address *
                                                    </label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        required
                                                    />

                                                    <label>
                                                        Current password (leave
                                                        blank to leave
                                                        unchanged)
                                                    </label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                    />

                                                    <label>
                                                        New password (leave
                                                        blank to leave
                                                        unchanged)
                                                    </label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                    />

                                                    <label>
                                                        Confirm new password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        className="form-control mb-2"
                                                    />

                                                    <button
                                                        type="submit"
                                                        className="btn btn-outline-primary-2"
                                                    >
                                                        <span>
                                                            SAVE CHANGES
                                                        </span>
                                                        <i className="icon-long-arrow-right"></i>
                                                    </button>
                                                </form>
                                            </TabPanel>
                                            <TabPanel>
                                                <div></div>
                                            </TabPanel>
                                        </div>
                                    </div>
                                </div>
                            </Tabs>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(DashBoard);

export const getStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'forms'])),
        },
    };
};
