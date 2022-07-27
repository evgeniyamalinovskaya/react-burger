import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {OrderIngredient} from '../orderIngredient/orderIngredient';
import orderIngredientIdStyles from './orderIngredientId.module.css';
import {wsConnectionClosed, wsConnectionOpen} from "../../services/actions/wsActionTypes";

export const OrderIngredientId = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(wsConnectionOpen())
        return () => {
            dispatch(wsConnectionClosed())
        }
    }, [dispatch])

    return (
        <div className={orderIngredientIdStyles.container}>
            <OrderIngredient />
        </div>
    )
}
