import React from 'react';

import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import orderListStyle from './order-list.module.css';
import { useAppSelector } from 'src/index';
import { TOrderList, TOrderData } from 'utils/constants/types';
import { orderStatusText } from 'utils/constants/constants';

type TOrdersPrices = {
  [orderId: string]: number;
};

export type TOrderListProps = {
  ordersData: TOrderList;
  onDetailOrder: (order: TOrderData, orderPrice: number) => void;
  listType?: "statuses";
  listReverse?: true | undefined;
};

function OrderList({ ordersData, onDetailOrder, listType, listReverse }: TOrderListProps) {
  const allIngredients = useAppSelector((store) => store.ingredients);

  const [ordersPrice, setOrdersPrice] = React.useState<TOrdersPrices>({});

  const handleOrderClick = (order: TOrderData): void => {
    onDetailOrder(order, ordersPrice[order._id]);
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
    className={`pr-2 ${orderListStyle['order-list']} ${listReverse ? orderListStyle['order-list_reverse'] : ''}`}>
      {
        ordersData.orders.map((order) => {
          return (
            <li
            onClick={() => {handleOrderClick(order)}}
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
                <h2
                className={`text text_type_main-medium ${orderListStyle['order-list__title']}`}>
                  { order.name }
                </h2>

                {
                  listType === 'statuses' && (
                    <h3
                    className={`text text_type_main-default ${orderListStyle['order-list__title']} ${order.status === 'done'
                      ? orderListStyle['order-list__title_done']
                      : ''
                    }`}>
                      { orderStatusText[order.status] }
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
