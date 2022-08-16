import React, {FC, useMemo} from "react";
import ingredientStyles from './Ingridient.module.css'
import { Link, useLocation } from 'react-router-dom';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import {TIngredient, useAppSelector} from "../../utils/types";

export type TIngredients = {
    ingredient: TIngredient;
}

const Ingredient: FC<TIngredients> = ({ingredient}) => {
    const location = useLocation();

    /* Обращение к store */
    const { bun, element } = useAppSelector(store => store.burgerConstructor);
    const [{ isDrag }, dragRef] = useDrag(
        {
            type: 'ingredient',
            item: { ingredient },
            collect: (monitor) => ({
                isDrag: monitor.isDragging(),
            }),
        },
        [bun, element],
    );
    // счетчик наличия ингредиента в меню
    const setCount = useMemo(() => {
        if (ingredient.type === 'bun') {
            return bun && ingredient._id === bun._id ? 2 : 0;
        }
        return element && element.filter((el) => el._id === ingredient._id).length;
    }, [bun, element, ingredient._id, ingredient.type]);

    return (
        <Link className={ingredientStyles.link}
        to={{
            pathname: `/ingredients/${ingredient._id}`,
            state: { background: location }
        }}>
        <div className={ingredientStyles.ingredient} ref={dragRef}
             draggable>
            {setCount > 0 && <Counter count={setCount} size="default" />}
            <img className="ml-4 mr-4" src={ingredient.image} alt={ingredient.name}/>
            <div className={ingredientStyles.price}>
                <span className='text text_type_digits-default'>{ingredient.price}</span>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={`${ingredientStyles.text} text text_type_main-default`}>{ingredient.name}</p>

        </div>
        </Link>
    )
}

export default Ingredient;
