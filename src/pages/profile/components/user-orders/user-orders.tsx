import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import userOrders from './user-orders.module.css';
import { TOrderList, TOrderData } from 'utils/constants/types';
import OrderList from 'src/components/order-list/order-list';

function UserOrders() {
  const navigate = useNavigate();
  const location = useLocation();

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

  const onOrderClick = (order: TOrderData): void => {
    navigate(
      `/profile/orders/${order.number}`,
      {
        state: {
          background: location,
          orderData: order,
          resetBackground: true,
        },
      },
    );
  };

  return (
    <div
    className={`${userOrders['order']}`}>
      <OrderList
      onDetailOrder={onOrderClick}
      ordersData={ordersFakeData}
      listType="statuses"/>
    </div>
  );
}

export default UserOrders;
