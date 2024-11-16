import { useSelector } from 'react-redux';

import orderDetailsStyle from './order-details.module.css';
import doneImage from 'assets/images/done.svg';

import { RootState } from 'src/index';
import {
  TStoreOrder,
} from 'utils/constants/types';

function OrderDetails() {
  const orderNumber = useSelector((store: RootState) => store.order as TStoreOrder);

  return (
    <div
    className={`${orderDetailsStyle['order-details']}`}>
      <h2
      className={`text text_type_digits-large mb-8 ${orderDetailsStyle['order-details__number']}`}>
        { orderNumber }
      </h2>

      <p
      className={`text text_type_main-medium ${orderDetailsStyle['order-details__subtitle']}`}>
        идентификатор заказа
      </p>

      <img
      className={`mt-15 mb-15 ${orderDetailsStyle['order-details__done-image']}`}
      src={doneImage}
      alt="Космическая галочка"/>

      <p
      className={`mb-2 text text_type_main-default ${orderDetailsStyle['order-details__status']}`}>
        Ваш заказ начали готовить
      </p>

      <p
      className={`text text_type_main-default mb-15 ${orderDetailsStyle['order-details__advice']}`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
