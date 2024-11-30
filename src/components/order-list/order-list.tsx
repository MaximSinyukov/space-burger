import React from 'react';

import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import orderListStyle from './order-list.module.css';
import { useAppSelector } from 'src/index';
import { TOrderList } from 'utils/constants/types';

type TOrdersPrices = {
  [orderId: string]: number;
};

export type TOrderListProps = {
  ordersData: TOrderList;
  listType?: "statuses";
};

function OrderList({ ordersData, listType }: TOrderListProps) {
  const allIngredients = useAppSelector((store) => store.ingredients);

  const [ordersPrice, setOrdersPrice] = React.useState<TOrdersPrices>({});

  const orderStatuses: Readonly<{ // TODO after websocket
    [statusName: string]: string;
  }> = {
    done: 'Выполнен',
    inProgress: 'Готовится',
    created: 'Создан',
  };

  React.useEffect(() => {
    const newPrices: TOrdersPrices = {};

    ordersData.orders.forEach((order) => {
      let orderPrice = 0;

      order.ingredients.forEach((ingredientId) => {
        const ingredient = allIngredients.find((item) => item._id === ingredientId);

        if (ingredient) {
          orderPrice += ingredient.price;
        }
      });

      newPrices[order._id] = orderPrice;
    });

    setOrdersPrice(newPrices);
  }, [allIngredients, ordersData.orders]);

  return (
    <ul
    className={`pr-2 ${orderListStyle['order-list']}`}>
      {
        ordersData.orders.map((order) => {
          return (
            <li
            className={`p-6 ${orderListStyle['order-list__item']}`}
            key={order._id}>
              <div
              className={`${orderListStyle['order-list__item-section']}`}>
                <h3
                className={`text text_type_digits-default`}>
                  &#35;{order.number}
                </h3>

                <FormattedDate
                className={`text text_type_default-medium text_color_inactive`}
                date={new Date(order.createdAt)}/>
              </div>

              <div
              className={`${orderListStyle['order-list__titles-container']}`}>
                {/* // TODO after websocket */}
                <h2
                className={`text text_type_main-medium ${orderListStyle['order-list__title']}`}>
                  Death Star Starship Main бургер sadfsd ffsdf sdfs df sdfsdasdasdasdasdasdadadas asdassssssss dsdasda
                </h2>

                {
                  listType === 'statuses' && (
                    <h3
                    className={`text text_type_main-default ${orderListStyle['order-list__title']} ${order.status === 'done'
                      ? orderListStyle['order-list__title_done']
                      : ''
                    }`}>
                      { orderStatuses[order.status] }
                    </h3>
                  )
                }
              </div>

              <div
              className={`${orderListStyle['order-list__item-section']}`}>
                <ul
                className={`${orderListStyle['order-list__ingredients']}`}>
                  {
                    order.ingredients.slice(0, 6).map((ingredientId, index, arr) => {
                      const ingredientData = allIngredients.find((item) => item._id === ingredientId);

                      return ingredientData && (
                        <li
                        className={`${orderListStyle['order-list__image-container']}`}
                        style={{
                          zIndex: arr.length - index,
                          marginLeft: `${48 * index}px`
                        }}
                        key={index}>
                          <img
                          className={`${orderListStyle['order-list__image']}`}
                          src={ingredientData.image_mobile}
                          alt={`Фото ингредиента ${ingredientData.name}`}/>

                          {
                            order.ingredients.length > 6 && index === 5
                              && (
                                <p
                                className={`${orderListStyle['order-list__hide-ingredients-count']}`}>
                                  +{ order.ingredients.length - 6 }
                                </p>
                              )
                          }
                        </li>
                      );
                    })
                  }
                </ul>

                <div
                className={`ml-6 ${orderListStyle['order-list__price']}`}>
                  <span
                  className={`mr-2 text text_type_digits-default ${orderListStyle['order-list__price-value']}`}>
                    { ordersPrice[order._id] || 0}
                  </span>

                  <CurrencyIcon
                  type="primary"/>
                </div>
              </div>
            </li>
          );
        })
      }
    </ul>
  );
}

export default OrderList;
