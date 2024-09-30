import React from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard from './components/ingredient-card';
import IngredientDetails from '../ingredient-details/ingredient-details';
import PropTypes from 'prop-types';
import { IngredientType } from 'utils/types.js';

const BurgerIngredients = React.memo(function BurgerIngredients({ ingredients }) {
  const [visible, setVisible] = React.useState(false);
  const [currentIngredient, setCurrentIngredient] = React.useState(null);
  const [currentTab, setCurrentTab] = React.useState('bun');
  const [sortedIngredients, setSortedIngredients] = React.useState({
    bun: [],
    sauce: [],
    main: [],
  });

  const tabData = [
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
  ];

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
          tabData.map((tab) => {
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


      {visible && currentIngredient && (
        <IngredientDetails
        ingredient={currentIngredient}
        onClose={handleCloseModal}/>
      )}
    </section>
  );
});

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(IngredientType).isRequired,
};

export default BurgerIngredients;
