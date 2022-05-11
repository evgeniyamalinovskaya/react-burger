import React from 'react';
import { createPortal } from 'react-dom';
import modalStyles from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

// Находим DOM-элемент для отрисовки в нем модальных окон
const modalsContainer = document.querySelector('#modals');

const Modal = ({ onOverlayClick, onEscKeydown, children }) => {
    // При монтировании компонента (открытии модалки) навешиваем на document обработчик Esc
    // При демонтаже компонента (закрытии модалки) удаляем обработчик
    React.useEffect(() => {
        document.addEventListener('keydown', onEscKeydown);
        return () => {
            document.removeEventListener('keydown', onEscKeydown);
        };
    }, []);

    // Рендерим модалку в соответствующий DOM-элемент
    return createPortal(
        <>
            <div className={modalStyles.container}>
                <button className={modalStyles.closeButton} type="button">  {/* Кнопка*/}
                    <CloseIcon type='primary' onClick={onOverlayClick}/>
                </button>
                {children} {/* Вложенное в компонент содержимое */}
            </div>
            <ModalOverlay onClick={onOverlayClick} /> {/* Подложка */}
        </>,
        modalsContainer // Контейнер под модалки #modals
);
};

Modal.propTypes = {
    onOverlayClick: PropTypes.func.isRequired,
    onEscKeydown: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
};

export default Modal;