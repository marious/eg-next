import { useState } from 'react';
import { useOrdersQuery } from '~/framework/rest/orders/orders.query';
import ALink from '../features/alink';
import PageLoader from '../PageLoader';

export default function UserOrders() {
    const [page, setPage] = useState(1);
    const {
        data,
        isLoading: loading,
        error,
    } = useOrdersQuery({
        page,
    });

    if (error) {
        return <div>Error..</div>;
    }

    if (loading) {
        return <PageLoader />;
    }

    return (
        <div>
            {data.orders ? (
                <div>
                    <h2>Purchase History</h2>
                    <div className="data-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Details</th>
                                    <th>Info</th>
                                    <th>Amount</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.orders.data.map(order => (
                                    <tr key={order.id}>
                                        <td>
                                            {order.code}
                                            <br />
                                            <span className="text-muted">
                                                {order.date}
                                            </span>
                                        </td>
                                        <td>
                                            {
                                                order.orders[0].products.data
                                                    .length
                                            }{' '}
                                            Products
                                        </td>
                                        <td>${order.grand_total}</td>
                                        <td>
                                            <ALink
                                                href={`/orders/${order.code}`}
                                            >
                                                View Details
                                            </ALink>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div>
                    <p>No order has been made yet.</p>
                    <ALink
                        href="/shop/sidebar/list"
                        className="btn btn-outline-primary-2"
                    >
                        <span>GO SHOP</span>
                        <i className="icon-long-arrow-right"></i>
                    </ALink>
                </div>
            )}
        </div>
    );
}

UserOrders.authenticate = true;
