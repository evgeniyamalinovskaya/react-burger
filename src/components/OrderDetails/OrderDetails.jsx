import { DragIcon, CurrencyIcon, DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import blockListStyles from './OrderDetails.module.css';
import React from 'react';

const OrderDetails = (props) => {
    return (
        <section className={blockListStyles.OrderDetails}>
            <DragIcon style={{ marginRight: '8px' }} type="primary" />
            <div className={blockListStyles.ingredient}>
                <img className={blockListStyles.ingredientImage} src={props.ingredient.image} alt='' />
                <p className={blockListStyles.ingredientName}>{props.ingredient.name}</p>
                <div className={blockListStyles.ingredientPrice}>
                    <p style={{ marginRight: '8px' }} className="text text_type_digits-default">{props.ingredient.price}</p>
                    <CurrencyIcon style={{ textAlign: 'end' }} type="primary" />
                </div>
                <DeleteIcon type="primary" />
            </div>
        </section>
    )
}

export default OrderDetails;
