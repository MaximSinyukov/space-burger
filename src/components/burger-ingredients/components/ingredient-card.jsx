import ingredientCardStyle from './ingredient-card.module.css';
import React from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const IngredientCard = React.memo(function IngredientCard({ ingredient, onClick }) {
  const openIngredientDetails = () => {
    onClick(ingredient);
  };

  return (
    <li
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
        ingredient.__v > 0
          && (
            <Counter
            count={ingredient.__v}
            className={ingredientCardStyle['ingredient-card__counter']}/>
          )
      }
    </li>
  );
})

export default IngredientCard;
