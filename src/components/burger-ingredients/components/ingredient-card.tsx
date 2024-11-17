import React from 'react';
import { useDrag } from "react-dnd";

import ingredientCardStyle from './ingredient-card.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { TIngredient, TStoreSelectIngredients } from 'utils/constants/types';
import { useAppSelector } from 'src/index';

type TIngredientCardProps = {
  ingredient: TIngredient;
  onClick: (ingredient: TIngredient) => void;
};

const IngredientCard = React.memo(function IngredientCard({ ingredient, onClick }: TIngredientCardProps) {
const { ingredientsCounter, buns } = useAppSelector((store) => store.selectIngredients as TStoreSelectIngredients);

  const [counter, setCounter] = React.useState<number>(0);

  const [, dragRef] = useDrag<{ingredient: TIngredient}>({
    type: "ingredient",
    item: { ingredient }
  });

  const openIngredientDetails = (): void => {
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
            count={counter}/>
          )
      }
    </li>
  );
});

export default IngredientCard;
