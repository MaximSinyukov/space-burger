import ingredientStyle from './ingredient.module.css';

import IngredientDetails from 'components/ingredient-details/ingredient-details';

function Ingredient() {
  return (
    <div
    className={`${ingredientStyle['ingredient']}`}>
      <h1
      className={`text text_type_main-large ${ingredientStyle['ingredient__title']}`}>
        Детали ингредиента
      </h1>

      <IngredientDetails/>
    </div>
  );
}

export default Ingredient;
