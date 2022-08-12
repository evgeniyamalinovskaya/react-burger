import React, {useEffect, FC} from 'react';
import {OrderIngredient} from '../orderIngredient/orderIngredient';
import orderIngredientIdStyles from './orderIngredientId.module.css';
import {wsConnectionClosed, wsConnectionOpen} from "../../services/actions/wsActionTypes";
import {wsUserConnectionClosed, wsUserConnectionStart} from "../../services/actions/wsUser";
import {useAppDispatch} from "../../utils/types";

export const OrderIngredientId: FC = () => {
    const dispatch = useAppDispatch();

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
