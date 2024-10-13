import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from 'uuid';

import burgerConstructorStyle from './burger-constructor.module.css';

import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details';
import ConstructorIngredient from './components/constructor-ingredient';
import Modal from '../modal/modal';
import { request } from 'utils/request.js';

import { removeIngredient, decreaseIngredientCount, resetSelectIngredients, updateOtherIngredients, selectIngredient, selectBuns, increaseIngredientCount } from 'services/reducers/select-ingredients';
import { setOrderNumber, removeOrderNumber } from 'services/reducers/order';


const BurgerConstructor = React.memo(function BurgerConstructor() {
  const dispatch = useDispatch();

  const { buns, otherIngredients } = useSelector(store => store.selectIngredients);
  const orderNumber = useSelector(store => store.order);

  const [allPrice, setAllPrice] = React.useState(0);

  const [, dropIngredientTarget] = useDrop({
    accept: "ingredient",
    drop(ingredient) {
      handleDrop(ingredient);
    },
  });

  const handleDrop = ({ ingredient }) => {
    if (ingredient.type === 'bun') {
      dispatch(selectBuns(ingredient));
    } else {
      dispatch(selectIngredient({ ...ingredient, uniqueId: uuidv4() }));
      dispatch(increaseIngredientCount(ingredient._id));
    }
  };

  const sortIngredient = React.useCallback((dragIndex, dropIndex) => {
    const updatedIngredients = [...otherIngredients];
    const [draggedIngredient] = updatedIngredients.splice(dragIndex, 1);

    updatedIngredients.splice(dropIndex, 0, draggedIngredient);

    dispatch(updateOtherIngredients(updatedIngredients));
  }, [otherIngredients, dispatch]);

  const handleDeleteIngredient = (ingredientIndex, ingredientId) => {
    dispatch(removeIngredient(ingredientIndex));
    dispatch(decreaseIngredientCount(ingredientId));
  };

  const postOrder = React.useCallback(
    () => {
      if (!buns) return;

      request('/orders', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ingredients: [buns?._id, ...otherIngredients.map((item) => item._id), buns?._id].filter((item) => item),
        }),
      })
        .then((data) => {
          dispatch(setOrderNumber(data.order.number));
        })
        .catch(e => {
          console.warn('Error in postOrder method: ', e);
        });
    },
    [otherIngredients, dispatch, buns]
  );

  const handleCloseModal = React.useCallback(
    () => {
      dispatch(resetSelectIngredients());
      dispatch(removeOrderNumber());
    },
    [dispatch]
  );

  React.useEffect(() => {
    let newPrice = 0;

    otherIngredients.forEach((item) => {
      newPrice += item.price;
    });

    if (buns) {
      newPrice += buns.price * 2;
    }

    setAllPrice(newPrice);
  }, [buns, otherIngredients])

  return (
    <section
    ref={dropIngredientTarget}
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
                            <ConstructorIngredient
                            key={'constructor-ingredient-' + ingredient.uniqueId + index }
                            sortIngredient={sortIngredient}
                            onDelete={handleDeleteIngredient}
                            ingredient={ingredient}
                            index={index}/>
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
          { allPrice }
        </span>

        <CurrencyIcon
        className="pr-10 pl-2"
        type="primary"/>

        <Button
        onClick={postOrder}
        htmlType="button"
        type="primary"
        size="large">
          Оформить заказ
        </Button>
      </div>

      {orderNumber && (
        <Modal
        onClose={handleCloseModal}>
          <OrderDetails/>
        </Modal>
      )}
    </section>
  );
});

export default BurgerConstructor;
