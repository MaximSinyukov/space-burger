import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import burgerIngredientsStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard from './components/ingredient-card';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { setIngredientDetails, removeIngredientDetails } from 'services/reducers/detail-ingredient';

const BurgerIngredients = React.memo(function BurgerIngredients() {
  const dispatch = useDispatch();

  const ingredients = useSelector(store => store.ingredients);

  const containerRef = React.useRef(null);
  const titleRefs = React.useRef([]);

  const [visible, setVisible] = React.useState(false);
  const [currentTab, setCurrentTab] = React.useState('bun');
  const [sortedIngredients, setSortedIngredients] = React.useState({
    bun: [],
    sauce: [],
    main: [],
  });

  const tabData = React.useMemo(() => [
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

    let closestTab = currentTab;
    let minOffset = null;

    titleRefs.current.forEach((titleRef, index) => {
      if (titleRef) {
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

  const handleTabClick = (type) => {
    const titleRef = titleRefs.current.find(ref => ref.id === `title-${type}`);

    if (titleRef) {
      titleRef.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenModal = React.useCallback(
    (ingredient) => {
      dispatch(setIngredientDetails(ingredient));
      setVisible(true);
    },
    [dispatch]
  );

  const handleCloseModal = React.useCallback(
    () => {
      dispatch(removeIngredientDetails());
      setVisible(false);
    },
    [dispatch]
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
            onClick={handleTabClick}
            className={burgerIngredientsStyles['burger-ingredients__tab']}>
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
                ref={el => (titleRefs.current[index] = el)}
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


      {visible && (
        <Modal
        header="Детали ингредиента"
        onClose={handleCloseModal}>
          <IngredientDetails/>
        </Modal>
      )}
    </section>
  );
});

export default BurgerIngredients;
