import React, {useRef} from 'react';
import {DragIcon, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import constructorDetailsStyles from './ConstructorDetails.module.css';
import {useDispatch} from "react-redux";
import { resetItem} from "../../services/actions/constructor";
import {useDrag, useDrop} from "react-dnd";
import PropTypes from 'prop-types';
import ingredient from "../../utils/ingredient";

const ConstructorDetails = ( {item, index, handleDelete} ) => {
    const dispatch = useDispatch();

    const id = item.uId;

// Логика компонента изменение позиции элемента в списке
    const ref = useRef(null);

    const [{ handlerId }, drop] = useDrop({
        accept: 'element',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(), ///
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            dispatch(resetItem(dragIndex, hoverIndex));
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: 'element',
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;

    drag(drop(ref));


    return (
        <ul className={constructorDetailsStyles.OrderDetails} data-handler-id={handlerId} ref={ref} style={{ opacity }}>
        <li className={`${constructorDetailsStyles.ingredient} mb-4`}>
            <span >
                <DragIcon type="primary" />
            </span>
            <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image_mobile}
                handleClose={() => {handleDelete(item)}}
            />
        </li>
        </ul>
    );
}

ConstructorDetails.propTypes = {
    item: ingredient.isRequired,
    index: PropTypes.number.isRequired,
    handleDelete: PropTypes.func.isRequired,
};

export default ConstructorDetails;
