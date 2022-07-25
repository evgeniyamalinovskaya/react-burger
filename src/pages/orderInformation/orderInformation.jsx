import React from 'react';
import { Link, useLocation } from 'react-router-dom'
import orderInformationStyles from './orderInformation.module.css';
import {useSelector} from "react-redux";
import { Information } from '../Information/information';

export const OrdersInformation = () => {
    const location = useLocation();
    const orders = useSelector(store => store.wsOrders.orders);

    return (
        <>
            {orders.map((order) => {
                return (
                    <Link className={orderInformationStyles.link} key={order._id}
                          to={{
                              pathname: `/feed/${order._id}`,
                              state: { background: location }}}>
                        <Information
                            status=''
                            orderNumber={order.number}
                            orderTime={order.createdAt}
                            orderBurgerName={order.name}
                            ingredients={order.ingredients}
                        />
                    </Link>
                )
            })}
        </>
    );
}







