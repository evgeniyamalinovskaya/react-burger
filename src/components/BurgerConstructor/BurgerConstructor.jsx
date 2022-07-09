import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {ConstructorElement, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './BurgerConstructor.module.css';
import ConstructorDetails from '../ConstructorDetails/ConstructorDetails';
import {getOrder} from "../../services/actions/order";
import { addBun, deleteItem} from "../../services/actions/constructor";
import { useDrop } from 'react-dnd';
import bunImage from './image/PyhkoigriqQ8Q4t7EziOdA.png';
import {useHistory} from "react-router-dom";

const BurgerConstructor = () => {
    /* Обращение к store */
    const element = useSelector(store => store.burgerConstructor.element);
    const user = useSelector(store => store.user.user);
    const bun = useSelector(store => store.burgerConstructor.bun);
    const productsIds = useSelector(store => store.burgerConstructor.productsIds);
    //Функция для использование подсчёта стоимости
    const price = useMemo(() => {
        return (
            (bun ? bun.price * 1 : 0) +
            element.reduce((s, v) => s + v.price, 0)
        );
    }, [bun, element]);

    const dispatch = useDispatch();
    const history = useHistory();
    //Открытие модального окна оформить заказ
    const orderModal = (ids) => {
        user && dispatch(getOrder(ids));
        !user && history.push('/login')
    };

    const [{ isHover }, drop] = useDrop({
        accept: 'ingredient',
        drop({ ingredient}) {
            dispatch(addBun(ingredient));
        },
        collect: (monitor) => ({
            isHover: monitor.canDrop(),
        }),
    });
    //Удаление ингредиента из выбранного списка
    const handleDelete = (item) => {
        dispatch(deleteItem(item));
    }

    return (
        <div className={`${burgerConstructorStyles.section} pt-25 pl-6`}>
            <div сlassname={ isHover
                ? `${burgerConstructorStyles.top} ${burgerConstructorStyles.overbun}`
                : `${burgerConstructorStyles.top} `
            } >
            <div className={`${burgerConstructorStyles.container} pr-2`} ref={drop}>

                    {bun ? (
                    < ConstructorElement
                        type="top"
                        isLocked={true}
                        text={bun.name + " (верх)"}
                        price={bun.price}
                        thumbnail={bun.image_mobile}
                        key={`top:${bun._id}`}

                    />
                    ) : ( <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Выберите булку из списка слева"
                        price={0}
                        thumbnail={bunImage}
                />
                        )}

                {!bun && <p className='text text_type_digits-default text_color_inactive pt-8 pl-10'>Выберите и перетащите слева начинки и соусы для бургера</p>}
            <div className={`${burgerConstructorStyles.card} text_type_main-default mt-4 mb-4`}>
                {element && element.length > 0 && element.map((item, index) => (
                <ConstructorDetails
                        key={item.uId}
                        item={item}
                        index={index}
                        handleDelete={handleDelete} />
                ))}

                </div>
                {bun ? (
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image_mobile}
                    key={`bottom:${bun._id}`}
                />
                ) : (< ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Выберите булку из списка слева"
                    price={0}
                    thumbnail={bunImage}

                />
                )}

            </div>
            <div className={`${burgerConstructorStyles.money} mt-10`}>
                <h3 className='text text_type_digits-medium mr-10'>
                    {price}
                    <CurrencyIcon type="primary"/>
                </h3>
                <Button type="primary" size="large" onClick={() => {orderModal(productsIds)}}>Оформить заказ</Button>

            </div>
        </div>
            </div>
    )
}

export default BurgerConstructor;
