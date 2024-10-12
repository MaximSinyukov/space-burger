import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from "react-dnd";
import PropTypes from 'prop-types';

import burgerConstructorStyle from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';

import { removeIngredient, decreaseIngredientCount } from 'services/reducers/select-ingredients';

const BurgerConstructor = React.memo(function BurgerConstructor({ onDropHandler }) {
  const dispatch = useDispatch();

  const { buns, otherIngredients } = useSelector(store => store.selectIngredients);

  const [visible, setVisible] = React.useState(false);

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(ingredient) {
      onDropHandler(ingredient);
    },
  });

  const handleDeleteIngredient = (ingredientIndex, ingredientId) => {
    dispatch(removeIngredient(ingredientIndex));
    dispatch(decreaseIngredientCount(ingredientId));
  };

  const handleOpenModal = React.useCallback(
    () => {
      setVisible(true);
    },
    []
  );

  const handleCloseModal = React.useCallback(
    () => {
      setVisible(false);
    },
    []
  );

  return (
    <section
    ref={dropTarget}
    className={`mt-25 ${burgerConstructorStyle['burger-constructor']}`}>
      {
        !buns && otherIngredients.length === 0
          ? (
            <p
            className={`text text_type_main-default ${burgerConstructorStyle['burger-constructor__empty-constructor']}`}>
              Кажется чего-то не хватает...

              <br/>

              Добавим ингредиентов?&#128064;
            </p>
          ) : (
            <div
              className={`pl-8 ${burgerConstructorStyle['burger-constructor__ingredients']}`}>
                {buns
                  &&  (
                        <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={buns.name + ' (верх)'}
                        price={buns.price}
                        thumbnail={buns.image_mobile}
                        extraClass={`${burgerConstructorStyle['burger-constructor__buns']}`}/>
                      )
                }

                <ul
                className={`${burgerConstructorStyle['burger-constructor__main-ingredients']}`}>
                  {
                    otherIngredients.length > 0
                      ? otherIngredients
                          .map((ingredient, index) => (
                            <li
                            key={'order-ingredient-' + ingredient._id + index}
                            className={burgerConstructorStyle['burger-constructor__ingredient']}>
                              <DragIcon
                              className="mr-2"
                              type="primary"/>

                              <ConstructorElement
                              text={ingredient.name}
                              price={ingredient.price}
                              thumbnail={ingredient.image_mobile}
                              handleClose={() => {handleDeleteIngredient(index, ingredient._id)}}/>
                            </li>
                          )) : (
                            <p
                            className={`text text_type_main-default ${burgerConstructorStyle['burger-constructor__empty-other-ingredients']}`}>
                              Уже очень вкусно!&#128171;

                              <br/>

                              Добавим еще чего-нибудь?
                            </p>
                          )
                  }
                </ul>

                {buns
                  &&  (
                        <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={buns.name + ' (низ)'}
                        price={buns.price}
                        thumbnail={buns.image_mobile}
                        extraClass={`${burgerConstructorStyle['burger-constructor__buns']}`}/>
                      )
                }
              </div>
          )
      }

      <div
      className={`mt-10 pr-4 ${burgerConstructorStyle['burger-constructor__order-info']}`}>
        <span
        className={`text text_type_digits-medium ${burgerConstructorStyle['burger-constructor__order-price']}`}>
          610
        </span>

        <CurrencyIcon
        className="pr-10 pl-2"
        type="primary"/>

        <Button
        onClick={handleOpenModal}
        htmlType="button"
        type="primary"
        size="large">
          Оформить заказ
        </Button>
      </div>

      {visible && (
        <Modal
        onClose={handleCloseModal}>
          <OrderDetails/>
        </Modal>
      )}
    </section>
  );
});

BurgerConstructor.propTypes = {
  onDropHandler: PropTypes.func.isRequired,
};

export default BurgerConstructor;
