import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useOrderQuery } from '~/framework/rest/orders/orders.query';
import PageLoader from '../PageLoader';

export default function NewOrder() {
    const { query } = useRouter();
    const { t } = useTranslation('common');
    const { data, isLoading } = useOrderQuery({
        tracking_number: query.tracking_number,
    });

    if (isLoading) {
        return <PageLoader />;
    }

    return (
        <main className="main">
            {data.order && (
                <div className="page-content pb-5 order-sheet-style">
                    <div className="container pt-7">
                        <div className="row">
                            <div className="mx-auto col-lg-10 col-xl-10 col-12">
                                <div className="text-center py-5">
                                    <h1>{t('Thank You for Your Order')}</h1>
                                    <div>
                                        {t('Order Code')} :{' '}
                                        <span className="secondary--text">
                                            {data.order.code}
                                        </span>
                                    </div>
                                    <div className="font-italic">
                                        {t(
                                            ' A copy of your order summary has been sent to'
                                        )}{' '}
                                        {data.order.user.email}
                                    </div>
                                </div>
                                <div>
                                    <div className="order-header">
                                        {t('Order Summary')}
                                    </div>
                                    <div className="row mb-3">
                                        <div className="pb-0 pb-md-3 col-md-6 col-12">
                                            <div className="list">
                                                <div className="order-list-item">
                                                    <div className="fw-700">
                                                        {t('Order Code')}:
                                                    </div>
                                                    <div className="align-end">
                                                        {data.order.code}
                                                    </div>
                                                </div>
                                                <div className="order-list-item">
                                                    <div className="fw-700">
                                                        {t('Name')} :
                                                    </div>
                                                    <div className="align-end">
                                                        {data.order.user.name}
                                                    </div>
                                                </div>
                                                <div className="order-list-item">
                                                    <div className="fw-700">
                                                        {t('Email')} :
                                                    </div>
                                                    <div className="align-end">
                                                        {data.order.user.email}
                                                    </div>
                                                </div>
                                                <div className="order-list-item">
                                                    <div className="fw-700">
                                                        {t('Shipping Address')}{' '}
                                                        :
                                                    </div>
                                                    <div className="align-end">
                                                        {
                                                            data.order
                                                                .shipping_address
                                                                .address
                                                        }
                                                        ,{' '}
                                                        {
                                                            data.order
                                                                .shipping_address
                                                                .state
                                                        }
                                                        ,
                                                        {
                                                            data.order
                                                                .shipping_address
                                                                .city
                                                        }
                                                        ,{' '}
                                                        {
                                                            data.order
                                                                .shipping_address
                                                                .country
                                                        }{' '}
                                                        {
                                                            data.order
                                                                .shipping_address
                                                                .phone
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pb-0 pb-md-3 col-md-6 col-12">
                                            <div className="list">
                                                <div className="order-list-item">
                                                    <div className="fw-700">
                                                        {t(
                                                            'Total Order Amount'
                                                        )}{' '}
                                                        :
                                                    </div>
                                                    <div className="align-end">
                                                        $
                                                        {data.order.grand_total}
                                                    </div>
                                                </div>
                                                <div className="order-list-item">
                                                    <div className="fw-700">
                                                        {t('Payment Method')} :
                                                    </div>
                                                    <div className="align-end">
                                                        {
                                                            data.order.orders[0]
                                                                .payment_type
                                                        }
                                                    </div>
                                                </div>
                                                <div className="order-list-item">
                                                    <div className="fw-700">
                                                        {t('Delivery type')} :
                                                    </div>
                                                    <div className="align-end">
                                                        Standard
                                                    </div>
                                                </div>
                                                <div className="order-list-item">
                                                    <div className="fw-700">
                                                        {t('Billing Address')} :
                                                    </div>
                                                    <div className="align-end">
                                                        {
                                                            data.order
                                                                .shipping_address
                                                                .address
                                                        }
                                                        ,{' '}
                                                        {
                                                            data.order
                                                                .shipping_address
                                                                .state
                                                        }
                                                        ,
                                                        {
                                                            data.order
                                                                .shipping_address
                                                                .city
                                                        }
                                                        ,{' '}
                                                        {
                                                            data.order
                                                                .shipping_address
                                                                .country
                                                        }{' '}
                                                        {
                                                            data.order
                                                                .shipping_address
                                                                .phone
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card">
                                        <div className="row d-flex justify-content-between px-3 top">
                                            <div className="d-flex"></div>
                                            <div className="d-flex flex-column text-sm-right">
                                                <p className="mb-0"></p>
                                                <p></p>
                                            </div>
                                        </div>
                                        <div className="row d-flex justify-content-center">
                                            <div className="col-12">
                                                <ul
                                                    id="progressbar"
                                                    className="text-center"
                                                >
                                                    <li className="step0 active"></li>
                                                    <li
                                                        className={`step0 ${
                                                            [
                                                                'confirmed',
                                                                'processed',
                                                                'shipped',
                                                                'delivered',
                                                            ].includes(
                                                                data.order
                                                                    .orders[0]
                                                                    .delivery_status
                                                            )
                                                                ? 'active'
                                                                : ''
                                                        }`}
                                                    ></li>
                                                    <li
                                                        className={`step0 ${
                                                            [
                                                                'processed',
                                                                'shipped',
                                                                'delivered',
                                                            ].includes(
                                                                data.order
                                                                    .orders[0]
                                                                    .delivery_status
                                                            )
                                                                ? 'active'
                                                                : ''
                                                        }`}
                                                    ></li>
                                                    <li
                                                        className={`step0 ${
                                                            [
                                                                'shipped',
                                                                'delivered',
                                                            ].includes(
                                                                data.order
                                                                    .orders[0]
                                                                    .delivery_status
                                                            )
                                                                ? 'active'
                                                                : ''
                                                        }`}
                                                    ></li>
                                                    <li
                                                        className={`step0 ${
                                                            [
                                                                'delivered',
                                                            ].includes(
                                                                data.order
                                                                    .orders[0]
                                                                    .delivery_status
                                                            )
                                                                ? 'active'
                                                                : ''
                                                        }`}
                                                    ></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="row justify-content-between top">
                                            <div className="row d-flex icon-content">
                                                {' '}
                                                {/* <img
                                                className="icon"
                                                src="https://i.imgur.com/9nnc9Et.png"
                                            /> */}
                                                <div className="d-flex flex-column">
                                                    <p className="font-weight-bold">
                                                        {t('Order Placed')}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="row d-flex icon-content">
                                                {' '}
                                                {/* <img
                                                className="icon"
                                                src="https://i.imgur.com/u1AzR7w.png"
                                            /> */}
                                                <div className="d-flex flex-column">
                                                    <p className="font-weight-bold">
                                                        {t('Confirmed')}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="row d-flex icon-content">
                                                {' '}
                                                {/* <img
                                                className="icon"
                                                src="https://i.imgur.com/TkPm63y.png"
                                            /> */}
                                                <div className="d-flex flex-column">
                                                    <p className="font-weight-bold">
                                                        {t('Processed')}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="row d-flex icon-content">
                                                {' '}
                                                {/* <img
                                                className="icon"
                                                src="https://i.imgur.com/HdsziHP.png"
                                            /> */}
                                                <div className="d-flex flex-column">
                                                    <p className="font-weight-bold">
                                                        {t('Shipped')}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="row d-flex icon-content">
                                                {' '}
                                                {/* <img
                                                className="icon"
                                                src="https://i.imgur.com/HdsziHP.png"
                                            /> */}
                                                <div className="d-flex flex-column">
                                                    <p className="font-weight-bold">
                                                        {t('Delivered')}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="py-5">
                                        <div className="order-data-wrapper">
                                            <div>
                                                <table className="order-data-table">
                                                    <colgroup>
                                                        <col className="" />
                                                        <col className="" />
                                                        <col className="" />
                                                        <col className="" />
                                                        <col className="" />
                                                    </colgroup>
                                                    <thead className="v-data-table-header">
                                                        <tr>
                                                            <th
                                                                role="columnheader"
                                                                scope="col"
                                                                aria-label="#"
                                                                className="text-start"
                                                            >
                                                                <span>#</span>
                                                            </th>
                                                            <th
                                                                role="columnheader"
                                                                scope="col"
                                                                aria-label="Product
"
                                                                className="text-start"
                                                            >
                                                                <span>
                                                                    {t(
                                                                        'Product'
                                                                    )}
                                                                </span>
                                                            </th>
                                                            <th
                                                                role="columnheader"
                                                                scope="col"
                                                                aria-label="Quantity
"
                                                                className="text-start"
                                                            >
                                                                <span>
                                                                    {t(
                                                                        'Quantity'
                                                                    )}
                                                                </span>
                                                            </th>
                                                            <th
                                                                role="columnheader"
                                                                scope="col"
                                                                aria-label="Unit price
"
                                                                className="text-start"
                                                            >
                                                                <span>
                                                                    {t(
                                                                        'Unit price'
                                                                    )}
                                                                </span>
                                                            </th>
                                                            <th className="text-end">
                                                                <span>
                                                                    {t('Total')}
                                                                </span>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {data.order.orders[0].products.data.map(
                                                            (item, index) => (
                                                                <tr
                                                                    key={
                                                                        item.id
                                                                    }
                                                                    className=""
                                                                >
                                                                    <td className="text-start">
                                                                        <span className="d-block fw-600">
                                                                            {index +
                                                                                1}
                                                                        </span>
                                                                    </td>
                                                                    <td className="text-start">
                                                                        <div className="d-flex align-center">
                                                                            <img
                                                                                src={
                                                                                    item.thumbnail
                                                                                }
                                                                                alt={
                                                                                    item.name
                                                                                }
                                                                                className="size-70px flex-shrink-0"
                                                                            />{' '}
                                                                            <div className="flex-grow-1 ms-4">
                                                                                <div className="text-truncate-2">
                                                                                    {
                                                                                        item.name
                                                                                    }
                                                                                </div>{' '}
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td className="text-start">
                                                                        <span className="d-block fw-600">
                                                                            {
                                                                                item.quantity
                                                                            }
                                                                        </span>
                                                                    </td>
                                                                    <td className="text-start">
                                                                        <span className="d-block fw-600">
                                                                            $
                                                                            {
                                                                                item.price
                                                                            }
                                                                        </span>
                                                                    </td>
                                                                    <td className="text-end">
                                                                        <span className="d-block fw-600">
                                                                            $
                                                                            {
                                                                                item.total
                                                                            }
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mb-5">
                                        <div className="col-md-6 col-xl-7 order-md-1 col-12 order-2">
                                            <div className="mt-5 ms-lg-5">
                                                <img src="/public/assets/img/cod_sticker.svg" />
                                            </div>
                                        </div>{' '}
                                        <div className="col-md-6 col-xl-5 order-md-2 col-12 order-1">
                                            <div
                                                role="list"
                                                className="v-list v-sheet theme--light v-list--dense"
                                            >
                                                <div
                                                    role="listitem"
                                                    className="fw-700 v-list-item theme--light"
                                                >
                                                    <div className="v-list-item__content">
                                                        {t('Sub Total')} :
                                                    </div>{' '}
                                                    <div className="v-list-item__content align-end col-4 justify-end">
                                                        $
                                                        {
                                                            data.order.orders[0]
                                                                .subtotal
                                                        }
                                                    </div>
                                                </div>{' '}
                                                <div
                                                    role="listitem"
                                                    className="fw-700 v-list-item theme--light"
                                                >
                                                    <div className="v-list-item__content">
                                                        {t('Tax')} :
                                                    </div>{' '}
                                                    <div className="v-list-item__content align-end col-4 justify-end">
                                                        ${' '}
                                                        {
                                                            data.order.orders[0]
                                                                .tax
                                                        }
                                                    </div>
                                                </div>{' '}
                                                <div
                                                    role="listitem"
                                                    className="fw-700 v-list-item theme--light"
                                                >
                                                    <div className="v-list-item__content">
                                                        {t('Shipping Charge')} :
                                                    </div>{' '}
                                                    <div className="v-list-item__content align-end col-4 justify-end">
                                                        $
                                                        {
                                                            data.order.orders[0]
                                                                .shipping_cost
                                                        }
                                                    </div>
                                                </div>{' '}
                                                <div
                                                    role="listitem"
                                                    className="fw-700 v-list-item theme--light"
                                                >
                                                    <div className="v-list-item__content">
                                                        {t('Coupon discount')} :
                                                    </div>{' '}
                                                    <div className="v-list-item__content align-end col-4 justify-end">
                                                        $
                                                        {
                                                            data.order.orders[0]
                                                                .coupon_discount
                                                        }
                                                    </div>
                                                </div>
                                            </div>{' '}
                                            <div className="grey lighten-4 border border-gray-200 rounded">
                                                <div className="fw-700 v-list-item theme--light">
                                                    <div className="v-list-item__content">
                                                        {t('Total')} :
                                                    </div>{' '}
                                                    <div className="v-list-item__content align-end col-4 justify-end px-0">
                                                        $
                                                        {
                                                            data.order.orders[0]
                                                                .grand_total
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
