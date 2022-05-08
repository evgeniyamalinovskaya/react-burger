import React from 'react';
import PropTypes from 'prop-types';
import ingredient from '../../utils/ingredient';
import {DragIcon, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import orderDetailsStyles from './OrderDetails.module.css';

const OrderDetails = ({itemList}) => {
    return (
        <ul className={`${orderDetailsStyles.OrderDetails} pr-2`}>
            {itemList.map((item) => (
                <li className={orderDetailsStyles.ingredient} key={item._id}>
                    <DragIcon type="primary"/>
                    <ConstructorElement
                        text={item.name}
                        price={item.price}
                        thumbnail={item.image}
                    />
                </li>
            ))}
        </ul>
    )
}

OrderDetails.propTypes = {
    itemList: PropTypes.arrayOf(ingredient.isRequired).isRequired
}

export default OrderDetails;
