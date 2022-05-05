import React from 'react';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './BurgerConstructor.module.css';
import OrderDetails from "../OrderDetails/OrderDetails";
import data from '../../utils/data'

const BurgerConstructor = () => {

    {/*Перебираем массив data*/}
    const listIngredients = data.map((ingredient, index) =>
        <OrderDetails key={index} ingredient={ingredient}/>
    );

           return (
           <section className={`${burgerConstructorStyles.section} ml-5`}>
        <div className='pt-25'>
            <div className={burgerConstructorStyles.container}>
        <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={'https://code.s3.yandex.net/react/code/bun-02-mobile.png'}
        />
            </div>
            <div className={`${burgerConstructorStyles.card} text_type_main-default mt-4 mb-4 ml-4`}>

                {listIngredients} {/* Выводим ингредиенты*/}

            </div>
    <div className={burgerConstructorStyles.container}>
        <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={'https://code.s3.yandex.net/react/code/bun-02-mobile.png'}
        />
    </div>
            <div className={`${burgerConstructorStyles.money} mt-10`}>
            <h3 className='text text_type_digits-medium mr-10'>610
                <CurrencyIcon type="primary" />
            </h3>
            <Button type="primary" size="large" >
                Оформить заказ
            </Button>
            </div>
        </div>
           </section>
    )
}

export default BurgerConstructor;



