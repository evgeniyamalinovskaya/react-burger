import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import elementBurgerConstructor from './ElementBurgerConstructor.module.css';
import {REORDER_INGREDIENT} from "../../services/actions/constructor";

export const ElementBurgerConstructor = (props) => {
    const dispatch = useDispatch();

    const ref =useRef();
    const { element } = useSelector(store => store.burgerConstructor);

    const { id, index } = props;

    const [{ isDrag }, drag] = useDrag({
        type: 'element',
        item: { id, index },
        collect: monitor => ({
            isDrag: monitor.isDragging() ? 0.5 : 1
        })
    });

    function moveItem(dragIndex, hoverIndex) {
        let newItems = [...element];
        let dragItem = newItems[dragIndex];
        newItems.splice(dragIndex, 1);
        newItems.splice(hoverIndex, 0, dragItem);
        dispatch({ type: REORDER_INGREDIENT, data: newItems });
    };
    const [, drop] = useDrop({
        accept: 'element',
        hover(item) {
            if (item.index === index) {
                return;
            }
            if (!ref.current) {
                return;
            }
            moveItem(item.index, index);
            item.index = index
        }
    });
    drag(drop(ref));
    return (
        <li className={elementBurgerConstructor.item} ref={ref} style={{ isDrag }}>
            <DragIcon type="primary" />
            {props.children}
        </li>
    )
}

ElementBurgerConstructor.propTypes = {
    id: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired
}
