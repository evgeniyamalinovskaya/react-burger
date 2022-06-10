import React from 'react';
import { useSelector } from 'react-redux';
import orderDetailsStyle from './OrderDetails.module.css';

const OrderDetails = () => {

    const  orderNumber = useSelector(store => store.order);

    return(
        <div className={`${orderDetailsStyle.container} pt-30 pb-30`}>
            <h2 className={`${orderDetailsStyle.titleNumbers} text text_type_digits-large`}>{orderNumber.order.number}</h2>
            <p className='text text_type_main-medium pt-8'>Идентификатор заказа</p>
            <img className={`${orderDetailsStyle.image} pt-15 pb-15`} src={require('./images/done.png')} alt="Галочка"  />
            <p className='text text_type_main-default pb-2'>Ваш заказ начали готовить</p>
            <p className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}


export default OrderDetails;
