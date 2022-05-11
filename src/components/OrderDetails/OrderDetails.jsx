import React from 'react';
import orderDetailsStyle from './OrderDetails.module.css';
import done from '../../images/done.png'

const OrderDetails = () => {
    return(
        <div className={`${orderDetailsStyle.container} pt-30 pb-30`}>
            <h2 className={`${orderDetailsStyle.titleNumbers} text text_type_digits-large`}>034536</h2>
            <p className='text text_type_main-medium pt-8'>Идентификатор заказа</p>
            <img src={done} alt="Галочка" className={`${orderDetailsStyle.image} pt-15 pb-15`} />
            <p className='text text_type_main-default pb-2'>Ваш заказ начали готовить</p>
            <p className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

export default OrderDetails;