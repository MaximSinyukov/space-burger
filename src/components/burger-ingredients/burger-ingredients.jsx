import React from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard from './components/ingredient-card';
import IngredientDetails from '../ingredient-details/ingredient-details';

const BurgerIngredients = React.memo(function BurgerIngredients({ ingredients }) {
  const [visible, setVisible] = React.useState(true);
  const [currentIngredient, setCurrentIngredient] = React.useState(null);
  const [currentTab, setCurrentTab] = React.useState('bun');
  const [tabsData, setTabsData] = React.useState({
    bun: {
      type: 'bun',
      title: 'Булки',
      ingredients: [],
    },
    sauce: {
      type: 'sauce',
      title: 'Соусы',
      ingredients: [],
    },
    main: {
      type: 'main',
      title: 'Начинки',
      ingredients: [],
    },
  });

  const handleOpenModal = React.useCallback(
    (ingredient) => {
      setCurrentIngredient(ingredient);
      setVisible(true);
    },
    []
  );

  const handleCloseModal = React.useCallback(
    () => {
      setVisible(false);
    },
    []
  );

  React.useEffect(() => {
    const newTabsData = {
      bun: { ...tabsData.bun, ingredients: [] },
      sauce: { ...tabsData.sauce, ingredients: [] },
      main: { ...tabsData.main, ingredients: [] },
    };

    ingredients?.forEach((ingredient) => {
      newTabsData[ingredient.type].ingredients.push(ingredient);
    });

    setTabsData(newTabsData);
  }, [ingredients, tabsData.bun, tabsData.main, tabsData.sauce]);

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
          Object.values(tabsData).map((tab) => (
            <Tab
            key={tab.type}
            value={tab.type}
            active={currentTab === tab.type}
            onClick={setCurrentTab}
            className={burgerIngredientsStyles['burger-ingredients__tab']}>
              {tab.title}
            </Tab>
          ))
        }
      </nav>

      <div
      className={`${burgerIngredientsStyles['burger-ingredients__ingredient']}`}>
        {
          Object.values(tabsData).map((tab) => {
            return (
              <React.Fragment
              key={'ingredient-section-' + tab.type}>
                <h2
                className={`mt-10 mb-6 text text_type_main-medium ${burgerIngredientsStyles['burger-ingredients__ingredient-title']}`}>
                  { tab.title }
                </h2>

                <ul
                className={`mr-4 ml-4 ${burgerIngredientsStyles['burger-ingredients__ingredient-list']}`}>
                  {
                    tab.ingredients.map((ingredient) => (
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


      {visible && currentIngredient && (
        <IngredientDetails
        ingredient={currentIngredient}
        onClose={handleCloseModal}/>
      )}
    </section>
  );
})

export default BurgerIngredients;
