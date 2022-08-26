import React, { FC } from 'react';
import ordersStyles from './orders.module.css';
import {useAppSelector} from "../../utils/types";

export const Orders: FC = () => {
    const orders = useAppSelector(store => store.wsOrders.orders);
    //Готовые
    const doneStatus = orders.filter(order => order.status === 'done').filter((order, index) => index < 10)
    //В ожидании
    const pendingStatus = orders.filter(order => order.status !== 'done').filter((order, index) => index >= 10)
    //Выполнено за время
    const total = useAppSelector((state) => state.wsOrders.total);
    //Выполнено за сегодня
    const totalToday = useAppSelector((state) => state.wsOrders.totalToday);

    return (
        <section className={ordersStyles.container}>
            <div className={ordersStyles.columns}>
            <div className={ordersStyles.list}>
            <h3 className='text text_type_main-medium pb-1'>Готовы:</h3>
                {doneStatus.map((order) => (
                    <li className={`${ordersStyles.numberDone} text text_type_digits-default`} key={order._id}>{order.number}</li>
                ))}
            </div>
            <div className={ordersStyles.list}>
            <h3 className='text text_type_main-medium pb-1'>В работе:</h3>
                {pendingStatus.map((order) => (
                    <li className={`${ordersStyles.numberWork} text text_type_digits-default`} key={order._id}>{order.number}</li>
                ))}
            </div>
            </div>
            <div>
                <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
                <p className={`${ordersStyles.performed} text text_type_digits-large `}>{total}</p>
            </div>
            <div>
                <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
                <p className={`${ordersStyles.performed} text text_type_digits-large`}>{totalToday}</p>
            </div>
        </section>
    )
}
