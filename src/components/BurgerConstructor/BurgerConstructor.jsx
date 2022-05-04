import React from 'react';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './BurgerConstructor.module.css';
import PropTypes from 'prop-types';
import OrderDetails from "../OrderDetails/OrderDetails";
import ingredient from '../../utils/ingredient';
import data from '../../utils/data'

const BurgerConstructor = () => {

    const listIngridients = data.map((ing, index) =>
        <OrderDetails key={index} ing={ing}/>
    );

       return (
           <section className={`${burgerConstructorStyles.test} ml-5`}>
        <div className={`${burgerConstructorStyles.test} pt-25`}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={'https://code.s3.yandex.net/react/code/bun-02-mobile.png'}
            background-color={'#1C1C21'}
        />
            </div>
            <div className={burgerConstructorStyles.card}>
                {listIngridients}

            </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={'https://code.s3.yandex.net/react/code/bun-02-mobile.png'}
        />
    </div>
            <div className={`${burgerConstructorStyles.money} pt-10`}>
            <h3 className='text text_type_digits-medium'>610</h3>

                <CurrencyIcon type="primary" />
            <Button type="primary" size="large" className='ml-10'>
                Оформить заказ
            </Button>
            </div>
        </div>
           </section>
    )
}

BurgerConstructor.propTypes = {
    item: PropTypes.arrayOf(ingredient.isRequired).isRequired
}

export default BurgerConstructor;



