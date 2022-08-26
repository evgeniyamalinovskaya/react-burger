import React, {FC} from 'react';
import { Link } from 'react-router-dom';

import notFoundStyles from './notFound404.module.css';
import pageNotFound from './images/404-error.png';

export const NotFound404: FC = () => {
    return (
        <div className={notFoundStyles.container}>
            <div className={notFoundStyles.content}>
                <img className={notFoundStyles.image} alt="page not found" src={pageNotFound} />
                <Link to='/' className={notFoundStyles.text}>Перейти назад на главную страницу</Link>
            </div>
        </div>
    );
};
