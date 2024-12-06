import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import feedStyle from './feed.module.css';
import OrderList from 'src/components/order-list/order-list';
import { TOrderList, TOrderData } from 'utils/constants/types';

type TOrderStatusesLists = {
  [orderStatusList: string]: number[];
};

type TStatusesData = Readonly<{
  title: string;
  statusName: 'done' | 'inProgress';  // TODO after websocket
}[]>;

function Feed() {
  const navigate = useNavigate();
  const location = useLocation();

  const [orderStatusesLists, setOrderStatusesLists] = React.useState<TOrderStatusesLists>({});

  const ordersFakeData = React.useMemo<TOrderList>(() => ({ // TODO after websocket
    success: true,
    orders: [
      {
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
        updatedAt: "2021-06-23T14:43:22.603Z"
      },
      {
        ingredients: [
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0942",
          "643d69a5c3f7b9001cfa0941",
        ],
        _id: "asdasdasd212",
        status: "done",
        number: 111,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z"
      },
      {
        ingredients: [
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0942",
          "643d69a5c3f7b9001cfa0942",
          "643d69a5c3f7b9001cfa0942",
          "643d69a5c3f7b9001cfa093c",
        ],
        _id: "asda111sdasd",
        status: "done",
        number: 3333,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z"
      },
      {
        ingredients: [
          "60d3463f7034a000269f45e7",
          "60d3463f7034a000269f45e9",
          "60d3463f7034a000269f45e8",
          "60d3463f7034a000269f45ea"
        ],
        _id: "asdasda3332sd",
        status: "inProgress",
        number: 21,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z"
      },
      {
        ingredients: [
          "60d3463f7034a000269f45e7",
          "60d3463f7034a000269f45e9",
          "60d3463f7034a000269f45e8",
          "60d3463f7034a000269f45ea"
        ],
        _id: "asdasd1232asd",
        status: "done",
        number: 22,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z"
      },
      {
        ingredients: [
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0942",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa0942",
          "643d69a5c3f7b9001cfa093c",
        ],
        _id: "asdas112dasd",
        status: "done",
        number: 3331223,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z"
      },
      {
        ingredients: [
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0942",
          "643d69a5c3f7b9001cfa0941",
        ],
        _id: "as1212dasdasd212",
        status: "done",
        number: 111222,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z"
      },
      {
        ingredients: [
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0942",
          "643d69a5c3f7b9001cfa0942",
          "643d69a5c3f7b9001cfa0942",
          "643d69a5c3f7b9001cfa093c",
        ],
        _id: "asda111sda122sd",
        status: "done",
        number: 3121212333,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z"
      },
      {
        ingredients: [
          "60d3463f7034a000269f45e7",
          "60d3463f7034a000269f45e9",
          "60d3463f7034a000269f45e8",
          "60d3463f7034a000269f45ea"
        ],
        _id: "asdas222da3332sd",
        status: "done",
        number: 2121212,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z"
      },
      {
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
        _id: "asdasdasdssssss",
        status: "inProgress",
        number: 333137,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z"
      },
      {
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
        _id: "asdasdasdsswwssss",
        status: "done",
        number: 3331371,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z"
      },
      {
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
        _id: "asdasdssasdsswwssss",
        status: "inProgress",
        number: 33311371,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z"
      },
      {
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
        _id: "asdas1sss",
        status: "inProgress",
        number: 33313871,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z"
      },
      {
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
        _id: "dasdasdsswwssss",
        status: "inProgress",
        number: 31371,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z"
      },
      {
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
        _id: "ass",
        status: "done",
        number: 3331375,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z"
      },
      {
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
        _id: "asss",
        status: "done",
        number: 32375,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z"
      },
      {
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
        _id: "assq",
        status: "done",
        number: 3336,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z"
      },
      {
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
        _id: "asssh",
        status: "done",
        number: 3355,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z"
      },
      {
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
        _id: "ass09",
        status: "done",
        number: 33313757,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z"
      },
      {
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
        _id: "assjg",
        status: "done",
        number: 3395,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z"
      },
      {
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
        _id: "assash3",
        status: "done",
        number: 33798678,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z"
      },
      {
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
        _id: "askash3",
        status: "done",
        number: 33798656678,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z"
      },
      {
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
        _id: "assaggssh3",
        status: "done",
        number: 39678,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z"
      },
    ],
    total: 12300000000,
    totalToday: 123232515156121,
  }), []);

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
    const newState: TOrderStatusesLists = {};

    ordersFakeData.orders.forEach((order) => {
      if (Array.isArray(newState[order.status])) {
        newState[order.status].push(order.number);
        return;
      }

      newState[order.status] = [order.number];
    });

    setOrderStatusesLists(newState);
  }, [ordersFakeData])

  return (
    <section
    className={`${feedStyle['feed']}`}>
      <h1
      className={`text text_type_main-large mt-10 mb-5 ${feedStyle['feed__title']}`}>
        Лента заказов
      </h1>

      <div
      className={`${feedStyle['feed__sections']}`}>
        <OrderList
        onDetailOrder={onOrderClick}
        ordersData={ordersFakeData}/>

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
              { ordersFakeData.total }
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
              { ordersFakeData.totalToday }
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Feed;
