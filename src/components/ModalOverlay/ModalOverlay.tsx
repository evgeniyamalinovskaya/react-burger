import React, { FC, DetailedHTMLProps, HTMLAttributes } from 'react';
import modalOverlayStyles from './ModalOverlay.module.css';
import PropTypes from 'prop-types';

interface TModalOverlay extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    onClick: () => void;
}

const ModalOverlay: FC<TModalOverlay> = ({ onClick }) => {
    // пропс onClick - это колбэк для клика по подложке, который закрывает модальное окно

    return (
        <div className={modalOverlayStyles.Overlay} onClick={onClick} />
    );
};

export default ModalOverlay;