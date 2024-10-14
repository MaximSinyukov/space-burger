import React from 'react';
import PropTypes from 'prop-types';
import { useDrag } from "react-dnd";
import { useSelector } from 'react-redux';

import ingredientCardStyle from './ingredient-card.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { IngredientType } from 'utils/types.js';

const IngredientCard = React.memo(function IngredientCard({ ingredient, onClick }) {
  const { ingredientsCounter, buns } = useSelector(store => store.selectIngredients);

  const [counter, setCounter] = React.useState(0);

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { ingredient }
  });

  const openIngredientDetails = () => {
    onClick(ingredient);
  };

  React.useEffect(() => {
    if (ingredient._id === buns?._id) {
      setCounter(2);
      return;
    }

    setCounter(ingredientsCounter[ingredient._id]);
  }, [buns, ingredient._id, ingredientsCounter])

  return (
    <li
    ref={dragRef}
    onClick={openIngredientDetails}
    className={`pb-6 ${ingredientCardStyle['ingredient-card']}`}>
      <img
      src={ingredient.image}
      alt={`Фото ингредиента ${ingredient.name}`}
      className={ingredientCardStyle['ingredient-card__image']}/>

      <p
      className={`${ingredientCardStyle['ingredient-card__price-container']}`}>
        <span
        className={`text text_type_digits-default ${ingredientCardStyle['ingredient-card__price']}`}>
          { ingredient.price }
        </span>

        <CurrencyIcon
        type="primary"
        className={ingredientCardStyle['ingredient-card__price-icon']}/>
      </p>

      <p
      className={`text text_type_main-default ${ingredientCardStyle['ingredient-card__name']}`}>
        { ingredient.name }
      </p>

      {
        counter > 0
          && (
            <Counter
            count={counter}
            className={ingredientCardStyle['ingredient-card__counter']}/>
          )
      }
    </li>
  );
});

IngredientCard.propTypes = {
  ingredient: IngredientType.isRequired,
  onClick: PropTypes.func,
};

export default IngredientCard;
