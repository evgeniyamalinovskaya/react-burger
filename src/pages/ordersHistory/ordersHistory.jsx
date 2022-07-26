import React from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {Information} from "../Information/information";

export const OrdersHistory = () => {
    const location = useLocation();
    const orders = useSelector((store) => store.wsUser.orders);

    return (
        <section>
            {orders.map((order) => {
                return (
                    <Link to={{ pathname: `/profile/orders/${order._id}`, state: { background: location } }} key={order._id}>
                        {order.status === 'done' &&
                        <Information
                            status='Выполнен'
                            orderNumber={order.number}
                            orderTime={order.createdAt}
                            orderBurgerName={order.name}
                            ingredients={order.ingredients}
                        />
                        }
                        {order.status === 'created' &&
                        <Information
                            status='Создан'
                            orderNumber={order.number}
                            orderTime={order.createdAt}
                            orderBurgerName={order.name}
                            ingredients={order.ingredients}
                        />
                        }
                        {order.status === 'pending' &&
                        <Information
                            status='Готовится'
                            orderNumber={order.number}
                            orderTime={order.createdAt}
                            orderBurgerName={order.name}
                            ingredients={order.ingredients}
                        />
                        }
                    </Link>)
            })}
        </section>
    );
}
