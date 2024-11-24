import ingredientDetailsStyle from './ingredient-details.module.css';

import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import { setIngredientDetails } from 'services/reducers/detail-ingredient';

import { useAppDispatch, useAppSelector } from 'src/index';
import {
  TIngredient,
} from 'utils/constants/types';

type TDetailsData = {
  type: keyof TIngredient,
  text: string,
}[];

function IngredientDetails() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const ingredient = useAppSelector((store) => store.detailIngredient);
  const ingredientsList = useAppSelector((store) => store.ingredients);

  const detailsData: Readonly<TDetailsData> = [
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

  React.useEffect(() => {
    const ingredientGetId: string = location.pathname.split('/')[2]

    if (ingredientGetId) {
      const getIngredientFromUrl: TIngredient | undefined = ingredientsList.find((ingredient) => ingredient._id === ingredientGetId);

      if (getIngredientFromUrl) {
        dispatch(setIngredientDetails(getIngredientFromUrl));
      }

      if (localStorage.getItem('ingredientModal') === 'created' && getIngredientFromUrl) {
        navigate('/');
      }
    }
  }, [dispatch, ingredientsList, location.pathname, navigate])

  React.useEffect(() => {
    if (ingredient) {
      window.history.replaceState(null, '', `/ingredients/${ingredient._id}`);
    }

    return () => {
      window.history.replaceState(null, '', '/');
    };
  }, [ingredient, ingredient?._id])

  return ingredient && (
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
  );
};

export default IngredientDetails;
