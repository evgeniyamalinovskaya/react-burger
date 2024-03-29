import React, {FC, useEffect} from 'react';
import feedStyles from './feed.module.css';
import { Orders } from '../orders/orders';
import { OrdersInformation } from '../orderInformation/orderInformation';
import { wsConnectionOpen, wsConnectionClosed } from '../../services/actions/wsActionTypes';
import {useAppDispatch} from "../../utils/types";

export const Feed: FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(wsConnectionOpen())
        return () => {
            dispatch(wsConnectionClosed())
        }
    }, [dispatch])

    return (
        <section className={feedStyles.section}>
            <div className={`${feedStyles.title} pl-2 pr-2`}>
                <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
                <div className={`mt-5 ${feedStyles.container}`}>
                    <OrdersInformation />
                </div>
            </div>
                <Orders />
        </section>
    )
}
