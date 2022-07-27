import React from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import orderIngredientStyle from './orderIngredient.module.css';

//Один заказ
export const OrderIngredient = () => {
    const {id} = useParams();
    const ingredients = useSelector((store) => store.burgerIngredients.ingredients);
    const orders = useSelector(store => store.wsOrders.orders);
    const order = orders?.find((order) => order._id === id);
    const knowIngredient = order?.ingredients.map((orderIngredient) => ingredients.find((ingredient) => ingredient._id === orderIngredient))

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
    const formatDate = (string) => {
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
                                        <div className={`text text_type_digits-default ${orderIngredientStyle.currency_container}`}>
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
                    <p className={`${orderIngredientStyle.price}text text_type_digits-default`}>{price()}</p>
                    <CurrencyIcon type="primary"/>
                        </div>
                </div>
            </div>
            )}
        </>
    )
}



