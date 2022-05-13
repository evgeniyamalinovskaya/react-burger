import React from 'react';
import { createPortal } from 'react-dom';
import modalStyles from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes, {array} from 'prop-types';

// Находим DOM-элемент для отрисовки в нем модальных окон
const modalsContainer = document.querySelector('#modals');

const Modal = ({ onClose, onEscKeydown, children }) => {
    // При монтировании компонента (открытии модалки) навешиваем на document обработчик Esc
    // При демонтаже компонента (закрытии модалки) удаляем обработчик
    React.useEffect(() => {
        document.addEventListener('keydown', onEscKeydown);
        document.addEventListener('Escape', onClose);
        return () => {
            document.removeEventListener('keydown', onEscKeydown);
            document.removeEventListener('Escape', onClose);
        }
    }, [])

    // Рендерим модалку в соответствующий DOM-элемент
    return createPortal(
        <>
            <div className={modalStyles.container}>
                <button className={modalStyles.closeButton} type="button">  {/* Кнопка*/}
                    <CloseIcon type='primary' onClick={onClose}/>
                </button>
                {children} {/* Вложенное в компонент содержимое */}
            </div>
            <ModalOverlay onClick={onClose} /> {/* Подложка */}
        </>,
        modalsContainer // Контейнер под модалки #modals
);
};

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onEscKeydown: PropTypes.func.isRequired,
    children: PropTypes.array.isRequired
};

export default Modal;