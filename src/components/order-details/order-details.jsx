import orderDetailsStyle from './order-details.module.css';
import Modal from '../modal/modal';
import doneImage from 'assets/images/done.svg';
import PropTypes from 'prop-types';

function OrderDetails({ onClose }) {
  return (
    <Modal
    onClose={onClose}>
      <div
      className={`${orderDetailsStyle['order-details']}`}>
        <h2
        className={`text text_type_digits-large mb-8 ${orderDetailsStyle['order-details__number']}`}>
          034536
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
    </Modal>
  );
};

OrderDetails.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default OrderDetails;
