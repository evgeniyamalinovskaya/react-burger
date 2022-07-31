import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {OrderIngredient} from '../orderIngredient/orderIngredient';
import orderIngredientIdStyles from './orderIngredientId.module.css';
import {wsConnectionClosed, wsConnectionOpen} from "../../services/actions/wsActionTypes";
import {wsUserConnectionClosed, wsUserConnectionStart} from "../../services/actions/wsUser";

export const OrderIngredientId = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(wsConnectionOpen())
        dispatch(wsUserConnectionStart())
        return () => {
            dispatch(wsConnectionClosed())
            dispatch(wsUserConnectionClosed())
        }
    }, [dispatch])

    return (
        <div className={orderIngredientIdStyles.container}>
            <OrderIngredient />
        </div>
    )
}
