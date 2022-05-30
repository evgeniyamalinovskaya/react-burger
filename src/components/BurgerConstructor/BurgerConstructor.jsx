import React, {useContext, useMemo} from 'react';
import {ConstructorElement, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './BurgerConstructor.module.css';
import ConstructorDetails from '../ConstructorDetails/ConstructorDetails';
import PropTypes from "prop-types";
import BurgerIngredientsContext from '../../services/BurgerIngredientsContext';

const BurgerConstructor = ({openModalOrder}) => {
    const ingredients = useContext(BurgerIngredientsContext);
    //Только булка
    const bun = useMemo(
        () => ingredients.find((el) => el.name === "Краторная булка N-200i"),
        [ingredients],
        );

    //Функция для использование подсчёта стоимости
    const price = useMemo(() => {
        return (
            (ingredients.bun ? ingredients.bun.price * 2 : 0) +
            ingredients.reduce((s, v) => s + v.price, 0)
        );
    }, [ingredients]);

    return (
        <div className={`${burgerConstructorStyles.section} ml-5 pt-25`}>
            <div className={burgerConstructorStyles.container} >
                {bun &&
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={bun.name + " (верх)"}
                        price={bun.price}
                        thumbnail={bun.image_mobile}
                    />
                }
            </div>
            <div className={`${burgerConstructorStyles.card} text_type_main-default mt-4 mb-4 ml-4`}>
                <ConstructorDetails/>
            </div>
            <div className={burgerConstructorStyles.container}>
                {bun &&
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image_mobile}
                />
                }
            </div>
            <div className={`${burgerConstructorStyles.money} mt-10`}>
                <h3 className='text text_type_digits-medium mr-10'>
                    {price}
                    <CurrencyIcon type="primary"/>
                </h3>
                <Button type="primary" size="large" onClick={() => openModalOrder()}>Оформить заказ</Button>
            </div>
        </div>
    )
}

BurgerConstructor.propTypes = {
    openModalOrder: PropTypes.func.isRequired,
};

export default BurgerConstructor;


