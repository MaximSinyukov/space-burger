import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import userOrders from './user-orders.module.css';
import { TOrderData } from 'utils/constants/types';
import OrderList from 'src/components/order-list/order-list';
import { connect, disconnect } from 'services/reducers/orderWebsocket';
import { useAppDispatch, useAppSelector } from 'src/index';
import { getCookie } from "utils/methods/cookieMethods";

function UserOrders() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const ordersData = useAppSelector((store) => store.orderWebsocket.data);
  const isAuth = useAppSelector((store) => store.user.isAuthorized);

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

  React.useEffect(() => {
    if (isAuth) {
      dispatch(connect(`wss://norma.nomoreparties.space/orders?token=${getCookie('token')}`));

      return () => {
        dispatch(disconnect());
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
    className={`${userOrders['order']}`}>
      {
        ordersData && (
          <OrderList
          onDetailOrder={onOrderClick}
          ordersData={ordersData}
          listReverse={true}
          listType="statuses"/>
        )
      }
    </div>
  );
}

export default UserOrders;
