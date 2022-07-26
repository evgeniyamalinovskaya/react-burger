import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useRouteMatch } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import orderIngredientStyle from './orderIngredient.module.css';
import {formatRelative, parseISO} from "date-fns";
import {ru} from "date-fns/locale";
import {WS_USER_CONNECTION_CLOSED, WS_USER_CONNECTION_START} from "../../services/actions/wsUser";
import { useHistory } from 'react-router-dom';

//Один заказ
export const OrderIngredient = () => {
    const { id } = useParams();
    const orders = useSelector((store) => store.wsOrders.orders);
    const ingredients = useSelector((store) => store.burgerIngredients.ingredients);
    const order = orders.find((order) => order._id === id);
    const findIngredient = order.ingredients.map((orderIngredient) => ingredients.find((ingredient) => ingredient._id === orderIngredient))

    //Функция для использование подсчёта стоимости
    const price = () => {
        let sum = 0;
        findIngredient.forEach((ingredient) => {
            const orderedIngredient = ingredients.find((orderIngredient) => orderIngredient._id === ingredient?._id);
            if (orderedIngredient?.price) {
                sum += orderedIngredient.price;
            }
        });
        return sum;
    };
    //Изменение даты
    const formatDate = (date) => {
        return formatRelative(parseISO(date), new Date(date), {locale: ru});
    }
    const dispatch = useDispatch()

    let match = useRouteMatch();
    const history = useHistory();
    const isProfile = '/profile/orders/:id';
    const isFeed = '/feed/:id';
    const user = useSelector(store => store.user.user);
    const allOrders = useSelector(store => store.wsOrders.orders);
    const userOrders = useSelector(store => store.wsUser.orders);

    let userData = match.path === isProfile ? userOrders : allOrders;

    let orderData = userData.find((el) => el._id === id);
    useEffect(() => {
        if (!orderData) {
        dispatch({ type: WS_USER_CONNECTION_START, payload: '/all' })
        }
        return () => {
            dispatch({ type: WS_USER_CONNECTION_CLOSED })
        }
    }, [dispatch])


    return (
        <>
            {order &&
                <div className={orderIngredientStyle.page}>
                <p className={`${orderIngredientStyle.number} text text_type_digits-default`}>#{order.number}</p>
                <h3 className="text text_type_main-medium pt-10">{order.name}</h3>
                    <p className={`${orderIngredientStyle.status} text text_type_main-default mt-3 mb-15 `}>
                        {order.status === 'done' ?
                        'Выполнен' : order.status === 'pending' ?
                            'Готовится': order.status === 'created' ?
                                'Создан' : 'Выполнен' }</p>
                <h3 className={`${orderIngredientStyle.compound} text text_type_main-medium mb-6`}>Состав:</h3>
                <section className={orderIngredientStyle.section}>
                    {Array.from(new Set(findIngredient)).map((ingredient) => {
                        return (
                        <section className={orderIngredientStyle.ingredient_info}>
                            <div className={orderIngredientStyle.info}>
                                <div className={orderIngredientStyle.border}>
                                    <img className={orderIngredientStyle.image} src={ingredient.image} alt={ingredient.name} />
                                </div>
                                <p className={`${orderIngredientStyle.name} text_type_main-default ml-4 `}>
                                    {ingredient.name}
                                </p>
                                <p className={'text text_type_digits-default mr-2 '}>
                                    {ingredient.price}
                                </p>
                                <CurrencyIcon type="primary" />
                            </div>
                        </section>
                        )
                    })
                    }
                </section>
                <div className={orderIngredientStyle.item}>
                    <p className={`text text_type_main-default text_color_inactive `}>{formatDate(order.createdAt)}</p>
                    <p className={`${orderIngredientStyle.price}text text_type_digits-default`}>{price()}</p>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
            }
        </>
    )
}



