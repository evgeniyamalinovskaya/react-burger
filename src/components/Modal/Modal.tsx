import React, { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import modalStyles from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

// Находим DOM-элемент для отрисовки в нем модальных окон
const modalsContainer = document.querySelector('#modals') as HTMLElement;
type TModal = {
    onClose: () => void;
    children?: ReactNode;
}
export const Modal: FC<TModal> = ({ onClose, children }) => {

    // Обработка нажатия Esc
    const handleEscKeydown = (e: {key: string}) => {
        e.key === "Escape" && onClose();
    };

    // При монтировании компонента (открытии модалки) навешиваем на document обработчик Esc
    // При демонтаже компонента (закрытии модалки) удаляем обработчик
    React.useEffect(() => {
        document.addEventListener('keydown', handleEscKeydown);
        return () => {
            document.removeEventListener('keydown', handleEscKeydown);
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



