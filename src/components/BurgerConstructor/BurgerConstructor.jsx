import React, { useMemo} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {ConstructorElement, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './BurgerConstructor.module.css';
import ConstructorDetails from '../ConstructorDetails/ConstructorDetails';
import {getOrder} from "../../services/actions/order";
import {addBun} from "../../services/actions/constructor";
import { useDrop } from 'react-dnd';
import {ElementBurgerConstructor} from "../ElementBurgerConstructor/ElementBurgerConstructor";
import {burgerConstructorReducer} from "../../services/reducers/constructor";

const BurgerConstructor = () => {

    const element = useSelector(store => store.burgerConstructor.element);
    const bun = useSelector(store => store.burgerConstructor.bun);
    //Функция для использование подсчёта стоимости
    const price = useMemo(() => {
        return (
            (bun ? bun.price * 2 : 0) +
            element.reduce((s, v) => s + v.price, 0)
        );
    }, [bun, element]);

    const dispatch = useDispatch();

    //Открытие модального окна оформить заказ
    const orderModal = (orderId) => {
        dispatch(getOrder(orderId));
    };
    console.log(orderModal)
    const [{ isHover }, dropTarget] = useDrop({
        accept: "ingredient",
        drop(item) {
            dispatch(addBun(item));
        },
        collect: (monitor) => ({
            isHover: monitor.isOver(),
        }),
    });

    return (
        <div className={`${burgerConstructorStyles.section} ml-5 pt-25`}  >
            <div className={burgerConstructorStyles.container}>
                <div сlassName={ isHover
                            ? `${burgerConstructorStyles.top} ${burgerConstructorStyles.overbun}`
                            : `${burgerConstructorStyles.top} `
                    } ref={dropTarget}>
                    {bun ? (
                    < ConstructorElement
                        type="top"
                        isLocked={true}
                        text={bun.name + " (верх)"}
                        price={bun.price}
                        thumbnail={bun.image_mobile}
                        key={`top:${bun._id}`}
                    />
                    )
                    : ( < ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Выберите булку из списка слева"
                        price={0}
                        thumbnail={bun}
                />
                        )}
                </div>
            <div className={`${burgerConstructorStyles.card} text_type_main-default mt-4 mb-4 ml-4`}>

                {element.filter(item => {
                    return item.type !== 'bun' }).map((item, index) => (
                <ElementBurgerConstructor id={item.id} index={index} key={item.id}>
                 {/*<ConstructorDetails  />*/}

                 </ElementBurgerConstructor>
                ))}

            </div>

            <div className={burgerConstructorStyles.container}>

                <div сlassName={ isHover
                    ? `${burgerConstructorStyles.bottom} ${burgerConstructorStyles.overbun}`
                    : `${burgerConstructorStyles.bottom} `
                }>
                    {bun ? (
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image_mobile}
                    key={`top:${bun._id}`}
                />
                )
                : (< ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Выберите булку из списка слева"
                    price={0}
                    thumbnail={bun}
                />
                )}
            </div>
            <div className={`${burgerConstructorStyles.money} mt-10`}>
                <h3 className='text text_type_digits-medium mr-10'>
                    {price}
                    <CurrencyIcon type="primary"/>
                </h3>
                <Button type="primary" size="large"  onClick={() => orderModal()}>Оформить заказ</Button>

            </div>
        </div>
            </div>
        </div>

    )
}

export default BurgerConstructor;


