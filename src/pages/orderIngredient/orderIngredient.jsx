import React, {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useParams, useRouteMatch } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import orderIngredientStyle from './orderIngredient.module.css';
import { useHistory } from 'react-router-dom';
import {WS_USER_CONNECTION_CLOSED, WS_USER_CONNECTION_START} from "../../services/actions/wsUser";
import {WS_CONNECTION_START, WS_CONNECTION_CLOSED} from '../../services/actions/wsActionTypes';
import {getUserInfo} from "../../services/actions/registration";
import {formatRelative, parseISO} from "date-fns";
import {ru} from "date-fns/locale";


//Один заказ
export const OrderIngredient = () => {
    const params = useParams()
    const orders = useSelector(store => store.wsOrders.orders);

    let order = { ingredients: [] }
    if (orders.orders) {
        order = orders.orders.find((el) => el._id === params.id)
    }
    //Изменение даты
    const formatDate = (date) => {
        return formatRelative(parseISO(date), new Date(date), {locale: ru});
    }
    const allIngredients = useSelector(store => store.burgerIngredients.ingredients);

    const ingredientsObj = order.ingredients.reduce((acc, el) => {
        acc[el] = (acc[el] || 0) + 1
        return acc
    }, {})

    const ingredients = []
    let ingredientsPrice = 0
    Object.keys(ingredientsObj).forEach((element) => {
        const ingredient = allIngredients.find((el) => el._id === el)
        if (ingredient) {
            ingredients.push(ingredient)
            ingredient.count = ingredientsObj[element]
            let price = ingredient.price * ingredientsObj[element]
            ingredientsPrice += price
        }
    })

    //Статус выполнения заказа пользователя
    const status =
        order.status === 'created'
            ? 'Создан'
            : order.status === 'pending'
                ? 'Готовится'
                : order.status === 'done'
                    ? 'Выполнен'
                    : '';

    let { id } = useParams();
    let match = useRouteMatch()
    const isProfile = '/profile/orders/:id';
    const isFeed = '/feed/:id';
    const user = useSelector(store => store.user.user);
    const userOrders = useSelector(store => store.wsUserOrders.orders);
    let arr = match.path === isProfile ? userOrders : orders;
    let orderData = arr.find((el) => el._id === id);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!orderData) {
            if (match.path === isProfile) {
                dispatch(getUserInfo());
                dispatch({ type: WS_USER_CONNECTION_START });
            }
            if (match.path === isFeed) {
                dispatch({ type: WS_CONNECTION_START });
            }
            history.replace(`${match.url}`);
        }

        return () => {
            if (match.path === isProfile) {
                dispatch({ type: WS_USER_CONNECTION_CLOSED });
            }
            if (match.path === isFeed) {
                dispatch({ type: WS_CONNECTION_CLOSED });
            }
        }
    }, [dispatch, orderData, history, match.path, match.url, user]);


        return (
        <>
            {allIngredients.length &&
            <div className={`${orderIngredientStyle.page}`}>
            <p className={`${orderIngredientStyle.number} text text_type_digits-default`}>#Номер заказа{order.number}</p>
            <h3 className="text text_type_main-medium pt-10">Название бургера{order.name}</h3>
                <p className={`${orderIngredientStyle.status} text text_type_main-default mt-3 mb-15 `}>Выполнен{status}</p>
                <h3 className={`${orderIngredientStyle.compound} text text_type_main-medium mb-6`}>Состав:</h3>
                <section className={orderIngredientStyle.section}>
                {allIngredients.map((el, i) => (
                    <IngredientDescription key={i} ingredient={el} />
                ))}
                </section>
            <div className={orderIngredientStyle.item}>
                <p className={`text text_type_main-default text_color_inactive `}>Дата{formatDate}</p>
                <p className={`${orderIngredientStyle.price}text text_type_digits-default`}> {ingredientsPrice}</p>
                <CurrencyIcon type="primary" />
            </div>
                </div>
            }
        </>
    )
}

const IngredientDescription = ({ ingredient }) => {
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
        {`${ingredient.count} x ${ingredient.price}`}
      </p>
                <CurrencyIcon type="primary" />
            </div>
        </section>
    )
}

