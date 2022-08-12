import React, { FC } from 'react';
import {useParams, useRouteMatch} from 'react-router-dom';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import orderIngredientStyle from './orderIngredient.module.css';
import {useAppSelector} from "../../utils/types";

//Один заказ
export const OrderIngredient: FC = () => {
    const {id} = useParams<{ id: string }>();
    let match = useRouteMatch();
    const profilePath = '/profile/orders/:id';
    let isProfile = match.path === profilePath;

    const allOrders = useAppSelector(store => store.wsOrders.orders);
    const myOrders = useAppSelector(store => store.wsUser.orders).slice();
    let orders = isProfile ? myOrders : allOrders;

    const ingredients = useAppSelector((store) => store.burgerIngredients.ingredients);
    const order = orders?.find((order) => order._id === id);
    const knowIngredient = order?.ingredients.map((orderIngredient) => ingredients.find((ingredient) => ingredient._id === orderIngredient))

    // const price = useMemo(() => {
    //     return knowIngredient?.reduce((sum, item) => {
    //         if (item.type === 'bun') {
    //             return sum += item.price * 2
    //         }
    //         return sum += (item ? item.price : 0);
    //     }, 0);
    // }, [knowIngredient])

    //Функция для использование подсчёта стоимости
    const price = () => {
        let sum = 0;
        knowIngredient?.forEach((ingredient) => {
            const orderedIngredient = ingredients.find((orderIngredient) => orderIngredient?._id === ingredient?._id);
            if (orderedIngredient?.price) {
                sum += orderedIngredient.price;
            }
        });
        return sum;
    };

    //Изменение даты
    const formatDate = (string: string) => {
        return new Date(string).toLocaleString();
    }

    return (
        <>
            {order && (
                <div className={`${orderIngredientStyle.page} pt-10 pl-10 pr-10 pb-15`}>
                    <p className={`${orderIngredientStyle.number} text text_type_digits-default`}>#{order?.number}</p>
                    <h3 className="text text_type_main-medium pt-10">{order?.name}</h3>
                    <p className={`${orderIngredientStyle.status} text text_type_main-default mt-3 mb-15 `}>
                        {order?.status === 'done' ?
                            'Выполнен' : order?.status === 'pending' ?
                                'Готовится' : order?.status === 'created' ?
                                    'Создан' : 'Выполнен'}</p>
                    <h3 className={`${orderIngredientStyle.compound} text text_type_main-medium mb-6`}>Состав:</h3>
                    <section className={orderIngredientStyle.section}>
                        {Array.from(new Set(knowIngredient))?.map((ingredient, i) => {
                            return (
                                <section className={orderIngredientStyle.ingredient_info} key={i}>
                                    <div className={orderIngredientStyle.info}>
                                        <div className={orderIngredientStyle.border}>
                                            <img className={orderIngredientStyle.image} src={ingredient?.image}
                                                 alt={ingredient?.name}/>
                                        </div>
                                        <p className={`${orderIngredientStyle.name} text_type_main-default ml-4 `}>
                                            {ingredient?.name}
                                        </p>
                                    </div>
                                    <div className={`text text_type_digits-default ${orderIngredientStyle.currency}`}>
                                        <span> {knowIngredient && knowIngredient.filter((filteredIngredient) =>
                                            filteredIngredient?._id === ingredient?._id).length} </span>
                                        x
                                        <div
                                            className={`text text_type_digits-default ${orderIngredientStyle.currency_container}`}>
                                            <p className={'text text_type_digits-default mr-2 '}>
                                                {ingredient?.price}
                                            </p>
                                            <CurrencyIcon type="primary"/>
                                        </div>
                                    </div>
                                </section>
                            )
                        })
                        }
                    </section>
                    <div className={orderIngredientStyle.item}>
                        <p className={`text text_type_main-default text_color_inactive `}>{formatDate(order?.createdAt)}</p>
                        <div className={orderIngredientStyle.item_container}>
                            <p className={`${orderIngredientStyle.price}text text_type_digits-default`}>{price}</p>
                            <CurrencyIcon type="primary"/>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}



