import React, {FC, useRef} from 'react';
import {DragIcon, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import constructorDetailsStyles from './ConstructorDetails.module.css';
import { resetItem} from "../../services/actions/constructor";
import {useDrag, useDrop} from "react-dnd";
import {TConstructorDetails, useAppDispatch} from "../../utils/types";

const ConstructorDetails: FC<TConstructorDetails> = ( {item, index, handleDelete} ) => {
    const dispatch = useAppDispatch();

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
            const dragIndex = index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }
            dispatch(resetItem(dragIndex, hoverIndex));
            index = hoverIndex;
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

export default ConstructorDetails;
