import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";

import burgerIngredientsStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard from './components/ingredient-card';
import { setIngredientDetails } from 'services/reducers/detail-ingredient';

import { AppDispatch, RootState } from 'src/index';
import {
  TStoreIngredients,
  TIngredient,
} from 'utils/constants/types';

type TSortElement = {
  bun: TIngredient[];
  sauce: TIngredient[];
  main: TIngredient[];
};

type TTabData = {
  type: keyof TSortElement,
  title: string,
}[];

const BurgerIngredients = React.memo(function BurgerIngredients() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const ingredients = useSelector((store: RootState) => store.ingredients as TStoreIngredients);

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const titleRefs = React.useRef<HTMLHeadingElement[]>([]);

  const [currentTab, setCurrentTab] = React.useState<string>('bun');
  const [sortedIngredients, setSortedIngredients] = React.useState<TSortElement>({
    bun: [],
    sauce: [],
    main: [],
  });

  const tabData = React.useMemo<TTabData>(() => [
    {
      type: 'bun',
      title: 'Булки',
    },
    {
      type: 'sauce',
      title: 'Соусы',
    },
    {
      type: 'main',
      title: 'Начинки',
    }
  ], []);

  const handleScroll = React.useCallback(() => {
    if (!containerRef.current || !titleRefs.current.length) return;

    let closestTab: string = currentTab;
    let minOffset: number | null = null;

    titleRefs.current.forEach((titleRef, index) => {
      if (titleRef && containerRef.current && minOffset) {
        const offset = Math.abs(titleRef.getBoundingClientRect().top - containerRef.current.getBoundingClientRect().top);

        if (offset < minOffset || minOffset === null) {
          minOffset = offset;
          closestTab = tabData[index].type;
        }
      }
    });

    if (closestTab !== currentTab) {
      setCurrentTab(closestTab);
    }
  }, [currentTab, tabData]);

  const handleTabClick = (type: string): void => {
    const titleRef = titleRefs.current.find(ref => ref.id === `title-${type}`);

    if (titleRef) {
      titleRef.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenModal = React.useCallback(
    (ingredient: TIngredient): void => {
      localStorage.setItem('background', JSON.stringify(location));
      dispatch(setIngredientDetails(ingredient));
      navigate(
        `/ingredients/${ingredient._id}`,
        {
          state: {
            background: location
          }
        }
      );
    },
    [dispatch, location, navigate]
  );

  React.useEffect(() => {
    const newTabsData: TSortElement = {
      bun: [],
      sauce: [],
      main: [],
    };

    ingredients?.forEach((ingredient) => {
      newTabsData[ingredient.type].push(ingredient);
    });

    setSortedIngredients(newTabsData);
  }, [ingredients]);

  return (
    <section
    className={`mt-10 ${burgerIngredientsStyles['burger-ingredients']}`}>
      <h1
      className={`mb-5 text text_type_main-larg ${burgerIngredientsStyles['burger-ingredients__title']}`}>
        Соберите бургер
      </h1>

      <nav
      className={`${burgerIngredientsStyles['burger-ingredients__tabs-container']}`}>
        {
          tabData.map((tab) => (
            <Tab
            key={tab.type}
            value={tab.type}
            active={currentTab === tab.type}
            onClick={handleTabClick}>
              {tab.title}
            </Tab>
          ))
        }
      </nav>

      <div
      ref={containerRef}
      className={`${burgerIngredientsStyles['burger-ingredients__ingredient']}`}
      onScroll={handleScroll}>
        {
          tabData.map((tab, index) => {
            return (
              <React.Fragment
              key={'ingredient-section-' + tab.type}>
                <h2
                id={`title-${tab.type}`}
                ref={
                  (el: HTMLHeadingElement): HTMLHeadingElement => (titleRefs.current[index] = el)
                }
                className={`mt-10 mb-6 text text_type_main-medium ${burgerIngredientsStyles['burger-ingredients__ingredient-title']}`}>
                  { tab.title }
                </h2>

                <ul
                className={`mr-4 ml-4 ${burgerIngredientsStyles['burger-ingredients__ingredient-list']}`}>
                  {
                    sortedIngredients[tab.type].map((ingredient) => (
                      <IngredientCard
                      onClick={handleOpenModal}
                      key={ingredient._id}
                      ingredient={ingredient}/>
                    ))
                  }
                </ul>
              </React.Fragment>
            );
          })
        }
      </div>
    </section>
  );
});

export default BurgerIngredients;
