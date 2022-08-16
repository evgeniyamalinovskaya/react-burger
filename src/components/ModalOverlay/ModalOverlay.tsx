import React, { FC } from 'react';
import modalOverlayStyles from './ModalOverlay.module.css';
import {TModalOverlay} from '../../utils/types';

const ModalOverlay: FC<TModalOverlay> = ({ onClick }) => {
    // пропс onClick - это колбэк для клика по подложке, который закрывает модальное окно

    return (
        <div className={modalOverlayStyles.Overlay} onClick={onClick} />
    );
};

export default ModalOverlay;
