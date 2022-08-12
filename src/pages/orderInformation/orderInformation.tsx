import React, { FC } from 'react';
import {Link, useLocation, useRouteMatch} from 'react-router-dom'
import {Information} from '../Information/information';
import orderInformationStyles from './orderInformation.module.css';
import {useAppSelector} from "../../utils/types";

// Список заказов
export const OrdersInformation: FC = () => {
    const location = useLocation();
    let match = useRouteMatch();
    const profilePath = '/profile/orders';

    const allOrders = useAppSelector(store => store.wsOrders.orders);
    const myOrders = useAppSelector(store => store.wsUser.orders).slice();

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
                            status=''
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







