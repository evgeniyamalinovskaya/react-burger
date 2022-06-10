import React from 'react';
import {DragIcon, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import constructorDetailsStyles from './ConstructorDetails.module.css';
import {useDispatch, useSelector} from "react-redux";
import {deleteItem} from "../../services/actions/constructor";

const ConstructorDetails = () => {
    // const ingredients = useSelector((state) => state.ingredients.ingredients);
    // const allIngredients = ingredients.filter((el) => el.type !== 'bun')
    const element = useSelector((store) => store.burgerConstructor);

    const dispatch = useDispatch();
    const handleDelete = (item) => {
        dispatch(deleteItem(item));
    };

    return (
        <ul className={`${constructorDetailsStyles.OrderDetails} pr-2`}>
            {element.map((item) => (
                <li className={constructorDetailsStyles.ingredient} key={item._id}>
                    {/*<DragIcon type="primary" />*/}
                    <ConstructorElement
                        id={item.id}
                        text={item.name}
                        price={item.price}
                        thumbnail={item.image}
                        key={item.id}
                        handleDelete={handleDelete}
                    />
                </li>
            ))}
        </ul>
      )
}

export default ConstructorDetails;
