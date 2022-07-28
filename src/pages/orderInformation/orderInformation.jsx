import React from 'react';
import {useSelector} from "react-redux";
import {Link, useLocation, useRouteMatch} from 'react-router-dom'
import {Information} from '../Information/information';
import orderInformationStyles from './orderInformation.module.css';

// Список заказов
export const OrdersInformation = () => {
    const location = useLocation();
    let match = useRouteMatch();
    const profilePath = '/profile/orders';

    const allOrders = useSelector(store => store.wsOrders.orders);
    const myOrders = useSelector(store => store.wsUser.orders).slice();

    myOrders.reverse();

    let isProfile = match.path === profilePath;
    let orders = isProfile ? myOrders : allOrders;
    let startPath = isProfile ? '/profile/orders/' : '/feed/';

    return (
        <>
            {orders.map((order) => {
                return (
                    <Link className={orderInformationStyles.link} key={order._id}
                          to={{
                              pathname: startPath + `${order._id}`,
                              state: {background: location}
                          }}>

                        {isProfile === true &&
                        <Information
                            status={order.status}
                            orderNumber={order.number}
                            createdAt={order.createdAt}
                            orderBurgerName={order.name}
                            ingredients={order.ingredients}
                        />
                        }
                        {isProfile === false &&
                        <Information
                            status=''
                            orderNumber={order.number}
                            createdAt={order.createdAt}
                            orderBurgerName={order.name}
                            ingredients={order.ingredients}
                        />
                        }
                    </Link>
                )
            })}
        </>
    );
}







