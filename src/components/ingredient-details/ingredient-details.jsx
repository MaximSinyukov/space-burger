import ingredientDetailsStyle from './ingredient-details.module.css';
import Modal from '../modal/modal';
import PropTypes from 'prop-types';
import { IngredientType } from 'utils/types.js';

function IngredientDetails({ onClose, ingredient }) {
  const detailsData = [
    {
      type: 'calories',
      text: 'Калории,ккал',
    },
    {
      type: 'proteins',
      text: 'Белки, г',
    },
    {
      type: 'fat',
      text: 'Жиры, г',
    },
    {
      type: 'carbohydrates',
      text: 'Углеводы, г',
    }
  ];

  return (
    <Modal
    header="Детали ингредиента"
    onClose={onClose}>
      <div
      className={ingredientDetailsStyle['ingredient-details']}>
        <img
        className={ingredientDetailsStyle['ingredient-details__image']}
        src={ingredient.image_large}
        alt={`Здесь должно быть фото ингредиента "${ingredient.name}"`}/>

        <h3
        className={`mt-4 mb-8 text text_type_main-medium ${ingredientDetailsStyle['ingredient-details__title']}`}>
          { ingredient.name }
        </h3>

        <div
        className={ingredientDetailsStyle['ingredient-details__info']}>
          {
            detailsData.map((detail) => (
              <p
              key={'detail-' + detail.type}
              className={ingredientDetailsStyle['ingredient-details__detail']}>
                <span
                className={`text text_type_main-default ${ingredientDetailsStyle['ingredient-details__detail-name']}`}>
                  { detail.text }
                </span>

                <span
                className={`text text_type_digits-default ${ingredientDetailsStyle['ingredient-details__detail-value']}`}>
                  { ingredient[detail.type] }
                </span>
              </p>
            ))
          }
        </div>
      </div>
    </Modal>
  );
};

IngredientDetails.propTypes = {
  ingredient: IngredientType.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default IngredientDetails;