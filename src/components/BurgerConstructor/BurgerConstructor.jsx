import React from 'react';
import {ConstructorElement, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './BurgerConstructor.module.css';
import OrderDetails from '../OrderDetails/OrderDetails';
import data from '../../utils/data';
import Items from '../../utils/Items';
import Products from '../../utils/Producrts';

const sauceArray = Items(Products.sauce.type, data);
const fillingArray = Items(Products.main.type, data);
const allIngredients = sauceArray.concat(fillingArray);  //создаем новый массив соединенный с двумя элементами в объекте

const BurgerConstructor = () => {
    return (
        <div className={`${burgerConstructorStyles.section} ml-5 pt-25`}>
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
                <OrderDetails itemList={allIngredients}/>
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
                    <CurrencyIcon type="primary"/>
                </h3>
                <Button type="primary" size="large">Оформить заказ</Button>
            </div>
        </div>
    )
}

export default BurgerConstructor;



