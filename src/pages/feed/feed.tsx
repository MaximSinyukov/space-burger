import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import feedStyle from './feed.module.css';
import OrderList from 'src/components/order-list/order-list';
import { TOrderData } from 'utils/constants/types';
import { useAppDispatch, useAppSelector } from 'src/index';
import { connect, disconnect } from 'services/reducers/orderWebsocket';

type TOrderStatusesLists = {
  [orderStatusList: string]: number[];
};

type TStatusesData = Readonly<{
  title: string;
  statusName: 'done' | 'inProgress';
}[]>;

function Feed() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const [orderStatusesLists, setOrderStatusesLists] = React.useState<TOrderStatusesLists>({});

  const ordersData = useAppSelector((store) => store.orderWebsocket.data);
  const statusesData: TStatusesData = [
    {
      title: 'Готовы:',
      statusName: 'done'
    },
    {
      title: 'В работе:',
      statusName: 'inProgress'
    },
  ];

  const onOrderClick = (order: TOrderData, orderPrice: number): void => {
    navigate(
      `/feed/${order.number}`,
      {
        state: {
          background: location,
          orderData: order,
          resetBackground: true,
        },
      },
    );
  };

  React.useEffect(() => {
    if (ordersData) {
      const newState: TOrderStatusesLists = {};

      ordersData.orders.forEach((order) => {
        const newStatus = order.status === 'done'
          ? 'done'
          : 'inProgress';

        if (Array.isArray(newState[newStatus])) {
          newState[newStatus].push(order.number);
          return;
        }

        newState[newStatus] = [order.number];
      });

      setOrderStatusesLists(newState);
    }
  }, [ordersData]);

  React.useEffect(() => {
    dispatch(connect('wss://norma.nomoreparties.space/orders/all'));

    return () => {
      dispatch(disconnect());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
    className={`${feedStyle['feed']}`}>
      <h1
      className={`text text_type_main-large mt-10 mb-5 ${feedStyle['feed__title']}`}>
        Лента заказов
      </h1>

      {
        ordersData && (
          <div
          className={`${feedStyle['feed__sections']}`}>
            <OrderList
            onDetailOrder={onOrderClick}
            ordersData={ordersData}/>

            <div
            className={`${feedStyle['feed__info']}`}>
              <div
              className={`${feedStyle['feed__boards-container']}`}>
                {
                  statusesData.map((statusData) => {
                    return (
                      <div
                      className={`${feedStyle['feed__status-board']}`}
                      key={statusData.statusName}>
                        <h4
                        className={`mb-6 text text_type_main-medium ${feedStyle['feed__status']}`}>
                          { statusData.title }
                        </h4>

                        <ul
                        className={`${feedStyle['feed__board']} ${statusData.statusName === 'done'
                          ? feedStyle['feed__board_done']
                          : ''
                        }`}>
                          {
                            orderStatusesLists[statusData.statusName]
                              && orderStatusesLists[statusData.statusName]
                                  .slice(0, 20)
                                  .map((orderNumber) => {
                                return (
                                  <li
                                  className={`text text_type_digits-default ${feedStyle['feed__order-number']}`}
                                  key={orderNumber}>
                                    { orderNumber }
                                  </li>
                                );
                              })
                          }
                        </ul>
                      </div>
                    );
                  })
                }
              </div>

              <div
              className={`${feedStyle['feed__total-container']}`}>
                <h4
                className={`text text_type_main-medium ${feedStyle['feed__total-title']}`}>
                  Выполнено за все время:
                </h4>

                <p
                className={`text text_type_digits-large ${feedStyle['feed__total-value']}`}>
                  { ordersData.total }
                </p>
              </div>

              <div
              className={`${feedStyle['feed__total-container']}`}>
                <h4
                className={`text text_type_main-medium ${feedStyle['feed__total-title']}`}>
                  Выполнено за сегодня:
                </h4>

                <p
                className={`text text_type_digits-large ${feedStyle['feed__total-value']}`}>
                  { ordersData.totalToday }
                </p>
              </div>
            </div>
          </div>
        )
      }
    </section>
  );
}

export default Feed;
