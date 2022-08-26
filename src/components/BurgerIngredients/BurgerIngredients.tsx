import React, { useEffect, FC, DetailedHTMLProps, HTMLAttributes } from 'react';
import { useInView } from 'react-intersection-observer';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyles from './BurgerIngredients.module.css';
import IngredientsCategory from "../IngredientsCategory/IngredientsCategory";
import ProductType from '../../utils/Producrts';
import {useAppSelector} from "../../utils/types";

const BurgerIngredients: FC = () => {
    // Используем хук для получения данных из хранилища
    const ingredients = useAppSelector(store => store.burgerIngredients.ingredients);

    // Пройдемся и вытащим булки, соусы и начинки
    const buns = ingredients.filter((el) => el.type === ProductType.Bun.type);
    const sauces = ingredients.filter((el) => el.type === ProductType.Sauce.type);
    const mains = ingredients.filter((el) => el.type === ProductType.Main.type);

    const [current, setCurrent] = React.useState('bun')

    const [bunRef, inViewBun] = useInView({ threshold: 1 });
    const [sauceRef, inViewSauce] = useInView({ threshold: 0.5 });
    const [mainRef, inViewMain] = useInView({ threshold: 0.5 });

    useEffect(() => {
        if (inViewBun) {
            setCurrent('bun');
        } else if (inViewSauce) {
            setCurrent('sauce');
        } else if (inViewMain) {
            setCurrent('main');
        }
    }, [inViewBun, inViewSauce, inViewMain]);

    //Скролл к разделу при клике на tab
    const onTabClick = (tab: string) => {
        setCurrent(tab);
        const element = document.getElementById(tab);
        if (element) element.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className={`${burgerIngredientsStyles.section} mr-5`}>
            <h1 className={`${burgerIngredientsStyles.title} mt-10 mb-5 text text_type_main-large`}>Соберите бургер</h1>
            <div className={burgerIngredientsStyles.tab}>
                <a className={burgerIngredientsStyles.citing} href="#bun">
                    <Tab value={"bun"} active={current === 'bun'} onClick={onTabClick}>
                        Булки
                    </Tab>
                </a>
                <a className={burgerIngredientsStyles.citing} href="#sauce">
                    <Tab value={"sauce"} active={current === 'sauce'} onClick={onTabClick}>
                        Соусы
                    </Tab>
                </a>
                <a className={burgerIngredientsStyles.citing} href="#main">
                    <Tab value={"main"} active={current === 'main'} onClick={onTabClick}>
                        Начинки
                    </Tab>
                </a>
            </div>
            <div className={burgerIngredientsStyles.container}>
                {/*<a name={'bun'}>*/}
                    <IngredientsCategory
                        categories={buns} type={ProductType.Bun} ref={bunRef}/>
                {/*</a>*/}
                {/*<a name={'sauce'}>*/}
                    <IngredientsCategory
                        categories={sauces} type={ProductType.Sauce} ref={sauceRef}/>
                {/*</a>*/}
                {/*<a name={'main'}>*/}
                    <IngredientsCategory
                        categories={mains} type={ProductType.Main} ref={mainRef}/>
                {/*</a>*/}
            </div>
        </div>
    )
}

export default BurgerIngredients;
