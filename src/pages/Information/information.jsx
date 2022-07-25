import React from "react";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";
import { useMemo } from 'react';
import {formatRelative, parseISO} from "date-fns";
import {ru} from "date-fns/locale";
import informationStyles from './information.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export const Information = ({status, orderNumber, orderTime, orderBurgerName, ingredients}) => {
    const allIngredients = useSelector(store => store.burgerIngredients.ingredients);
    //Изменение даты
    const formatDate = (date) => {
        return formatRelative(parseISO(date), new Date(date), {locale: ru});
    }
    const numbersHidden  = ingredients.length;
    const hiddenIngredient = numbersHidden  - 6;

    const ingredientsDataArray = useMemo(() => {
        return ingredients.map((ingredientInOrder) => {
            return allIngredients.find((item) => ingredientInOrder === item._id)
        })
    }, [ingredients, allIngredients])

    const ingredientData = useMemo(() => {
        return ingredientsDataArray.map((ingredient) => {
            return ingredient;
        })
    }, [ingredientsDataArray]);

    const totalOrder = ingredients.reduce((previousValue, currentItem) => {

        const ingredient = allIngredients.find((item) => {
            return currentItem === item._id;
        });

        if (!ingredient) {
            return previousValue;
        }

        return previousValue + ingredient.price;

    }, 0);

    return (
        <section className={`pt-6 pr-6 pl-6 pb-6 mb-6 ${informationStyles.section}`}>
            <div className={informationStyles.header}>
                <p className="text text_type_digits-default">#{orderNumber}</p>
                <p className="text text_type_main-default text_color_inactive">{formatDate(orderTime)}</p>
            </div>
            <div>
                <h3 className="text text_type_main-medium">{orderBurgerName}</h3>
                {!!status &&
                <p className={`text text_type_main-default ${informationStyles.status}`}>
                    {status === 'done' ? 'Выполнен' : status === 'pending' ? 'Готовится': status === 'created' ? 'Создан' : 'Выполнен' }
                </p>}
            </div>
            <div className={informationStyles.ingredientsInfo}>
                <ul className={informationStyles.ingredients}>
                    {allIngredients.length && ingredients.length && numbersHidden <= 5 &&
                    ingredientData.map((el, index) => {
                        return (
                            <li className={informationStyles.ingredient} key={index}>
                                {el &&
                                <Ingredient ingredientImage={el.image} ingredientName={el.name} />}
                            </li>
                        )
                    })
                    }
                    {allIngredients.length && ingredients.length && numbersHidden >= 6 &&
                    ingredientData.slice(0, 5).map((ing, index) => {
                        return (
                            <li className={informationStyles.ingredient} key={index}>
                                <Ingredient ingredientImage={ing.image} ingredientName={ing.name} />
                            </li>
                        )
                    })
                    }
                    {allIngredients.length && ingredients.length && numbersHidden > 6 && (
                        <li className={informationStyles.ingredient}>
                            <p className={`text text_type_main-default ${informationStyles.add_qty}`}>{`+${hiddenIngredient}`}</p>
                            <div className={informationStyles.length}>
                                {ingredientData.slice(5, 6).map((ing, index) => {
                                    return (
                                        <Ingredient ingredientImage={ing.image} ingredientName={ing.name} key={index} />
                                    )
                                })
                                }
                            </div>
                        </li >
                    )}
                </ul>
                <div className={`ml-6 ${informationStyles.price}`}>
                    <p className="text text_type_digits-default mr-2">
                        {totalOrder}
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </section >
    );
}

const Ingredient = ({ ingredientImage, ingredientName }) => {
    return (
        <div className={informationStyles.container}>
            <div className={informationStyles.list}>
                <img className={informationStyles.image} src={ingredientImage} alt={ingredientName} />
            </div>
      </div>
    );
}

Ingredient.propTypes = {
    ingredientName: PropTypes.string.isRequired,
    ingredientImage: PropTypes.string.isRequired,
}

Information.propTypes = {
    status: PropTypes.string.isRequired,
    orderNumber: PropTypes.number.isRequired,
    orderTime: PropTypes.string.isRequired,
    orderBurgerName: PropTypes.string.isRequired,
    ingredients: PropTypes.array.isRequired,
}
