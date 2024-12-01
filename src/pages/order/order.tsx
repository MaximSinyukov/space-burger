import React from "react";
import { useLocation } from "react-router-dom";
// import { useParams } from 'react-router-dom';

import orderStyle from './order.module.css';
import { TOrderData } from 'utils/constants/types';
import { orderStatusText } from 'utils/constants/constants';
import { useAppSelector } from 'src/index';

import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type TIngredientOrderCounts = {
  [ingredientId: string]: number;
};

function Order() {
  const location = useLocation();

  const allIngredients = useAppSelector((store) => store.ingredients);
  const [orderData, setOrderData] = React.useState<TOrderData | null>(null);
  const [isPopup, setIsPopup] = React.useState<boolean>(false);
  // const { routeOrderNumber } = useParams();
  console.log(location.state, localStorage.getItem('background'));

  React.useEffect(() => {
    if (location.state?.orderData) {
      setOrderData(location.state.orderData);
      setIsPopup(true);
    } else {
      setOrderData({
        ingredients: [
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0942",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0942",
          "643d69a5c3f7b9001cfa093c",
        ],
        _id: "asdasdasd",
        status: "done",
        number: 33313,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z",
      });
    }
  }, [location.state]);

  const ingredientOrderCounts = React.useMemo(() => {
    if (!orderData) return {};
    return orderData.ingredients.reduce((acc, ingredientId) => {
      acc[ingredientId] = (acc[ingredientId] || 0) + 1;
      return acc;
    }, {} as TIngredientOrderCounts);
  }, [orderData]);

  const orderPrice = React.useMemo(() => {
    return Object.entries(ingredientOrderCounts).reduce((total, [ingredientId, count]) => {
      const ingredient = allIngredients.find((item) => item._id === ingredientId);
      return total + (ingredient?.price || 0) * count;
    }, 0);
  }, [ingredientOrderCounts, allIngredients]);

  return orderData && (
    <div
    className={`${orderStyle['order']}`}>
      <h3
      className={`${orderStyle['order__number']} ${isPopup ? orderStyle['order__number_popup'] : ''} text text_type_digits-default`}>
        #{ orderData.number }
      </h3>

      <h3
      className={`text text_type_main-medium mt-10 mb-2 ${orderStyle['order__title']}`}>
        Black Hole Singularity острый бургерdsfgdsf dfsdfsdfs dfsd fsdf df dfs dfsdf sdfdsdasdasdasdasdads
      </h3>

      <h4
      className={`text text_type_main-default mb-15 ${orderStyle['order__status']} ${orderData.status === 'done'
        ? orderStyle['order__status_done']
        : ''
      }`}>
        { orderStatusText[orderData.status] }
      </h4>

      <h3
      className={`text text_type_main-medium mb-6 ${orderStyle['order__list-title']}`}>
        Состав:
      </h3>

      <ul
      className={`mb-10 pr-6 ${orderStyle['order__ingredient-list']}`}>
        {
          Object.entries(ingredientOrderCounts).map(([ingredientId, ingredientCount], index) => {
            const ingredientData = allIngredients.find((item) => item._id === ingredientId);

            return ingredientData && (
              <li
              key={ingredientId + index}
              className={`${orderStyle['order__ingredient']}`}>
                <div
                className={`mr-4 ${orderStyle['order__img-container']}`}>
                  <img
                  className={`${orderStyle['order__img']}`}
                  src={ingredientData.image_mobile}
                  alt={`Фото ингредиента ${ingredientData.name}`}/>
                </div>

                <p
                className={`text text_type_main-default ${orderStyle['order__ingredient-name']}`}>
                  { ingredientData.name }
                </p>

                <p
                className={`text text_type_digits-default ${orderStyle['order__ingredient-price']}`}>
                  {`${ingredientCount} x ${ingredientData.price}`}

                  <CurrencyIcon
                  type="primary"/>
                </p>
              </li>
            );
          })
        }
      </ul>

      <div
      className={`pb-10 ${orderStyle['order__footer']}`}>
        <FormattedDate
        className={`text text_type_main-default text_color_inactive ${orderStyle['order__date']}`}
        date={new Date(orderData.createdAt)}/>


        <p
        className={`text text_type_digits-default ${orderStyle['order__total']}`}>
          { orderPrice }

          <CurrencyIcon
          type="primary"/>
        </p>
      </div>
    </div>
  );
}

export default Order;
