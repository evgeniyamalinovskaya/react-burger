import React, {useMemo} from "react";
import ingredientStyles from './Ingridient.module.css'
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
// import PropTypes from 'prop-types';
import {openIngredientCurrent} from "../../services/actions/ingredient";
import {useDispatch, useSelector} from "react-redux";
import { useDrag } from 'react-dnd';

const Ingredient = ({ingredient}) => {
    const dispatch = useDispatch();
    // Клик по ингредиенту (открывает модальное окно)
    const handleOpenModal = (ingredient) => {
        dispatch(openIngredientCurrent(ingredient));
    };
    const { bun, element } = useSelector(store => store.burgerConstructor);
    const [{ isDrag }, dragRef] = useDrag(
        {
            type: 'ingredient',
            item: ingredient,
            collect: (monitor) => ({
                isDrag: monitor.isDragging(),
            }),
        },
        [bun, element],
    );
    // счетчик наличия ингрединта в меню
    const setCount = useMemo(() => {
        if (ingredient.type === 'bun') {
            return bun && ingredient._id === bun._id ? 2 : 0;
        }
        return element && element.filter((el) => el._id === ingredient._id).length;
    }, [bun, element]);

    return (
        <div className={ingredientStyles.ingredient} onClick={()=> handleOpenModal(ingredient)} style={{ isDrag }} ref={dragRef}
             draggable>
            {setCount > 0 && <Counter count={setCount} size="default" />}
            <img className="ml-4 mr-4" src={ingredient.image} alt={ingredient.name}/>
            <div className={ingredientStyles.price}>
                <span className='text text_type_digits-default'>{ingredient.price}</span>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={`${ingredientStyles.text} text text_type_main-default`}>{ingredient.name}</p>

        </div>
    )
}


export default Ingredient;
