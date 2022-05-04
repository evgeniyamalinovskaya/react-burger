import { DragIcon, CurrencyIcon, DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import blockListStyles from './OrderDetails.module.css';
import PropTypes from 'prop-types';

const OrderDetails = (props) => {
    return (
        <section className={blockListStyles.OrderDetails}>
            <DragIcon style={{ marginRight: '8px' }} type="primary" />
            <div className={blockListStyles.ingredient}>
                <img className={blockListStyles.ingredientImage} src={props.ing.image} alt='' />
                <p className={blockListStyles.ingredientName}>{props.ing.name}</p>
                <div className={blockListStyles.ingredientPrice}>
                    <span className='cost'>
                    <p style={{ marginRight: '8px' }} className="text text_type_digits-default">{props.ing.price}</p></span>
                    <CurrencyIcon style={{ textAlign: 'end' }} type="primary" />
                </div>
                <DeleteIcon type="primary" />
            </div>
        </section>
    )
}

OrderDetails.propTypes = {
    ing: PropTypes.shape({
        image: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired
};

export default OrderDetails;
