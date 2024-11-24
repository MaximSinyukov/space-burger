import React from 'react';
import { useDrop } from "react-dnd";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import burgerConstructorStyle from './burger-constructor.module.css';

import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details';
import ConstructorIngredient from './components/constructor-ingredient';
import Modal from '../modal/modal';

import { removeIngredient, decreaseIngredientCount, resetSelectIngredients, updateOtherIngredients, selectIngredient, selectBuns, increaseIngredientCount } from 'services/reducers/select-ingredients';
import { removeOrderNumber } from 'services/reducers/order';
import { postOrder } from 'src/services/actions/orderAction';

import { useAppDispatch, useAppSelector } from 'src/index';
import {
  TIngredient,
  TIngredientConstructor,
} from 'utils/constants/types';

const BurgerConstructor = React.memo(function BurgerConstructor() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { buns, otherIngredients } = useAppSelector((store) => store.selectIngredients);
  const { isAuthorized } = useAppSelector((store) => store.user);
  const orderNumber = useAppSelector((store)  => store.order);

  const [allPrice, setAllPrice] = React.useState(0);

  const [, dropIngredientTarget] = useDrop<{ingredient: TIngredient}, void, null>({
    accept: "ingredient",
    drop(ingredient) {
      handleDrop(ingredient);
    },
  });

  const handleDrop = ({ ingredient }: {ingredient: TIngredient}): void => {
    if (ingredient.type === 'bun') {
      dispatch(selectBuns(ingredient));
    } else {
      dispatch(selectIngredient({ ...ingredient, uniqueId: uuidv4() }));
      dispatch(increaseIngredientCount(ingredient._id));
    }
  };

  const sortIngredient = React.useCallback((dragId: string, dropId: string) => {
    const dragIndex = otherIngredients.findIndex((item: TIngredientConstructor): boolean => item.uniqueId === dragId);
    const dropIndex = otherIngredients.findIndex((item: TIngredientConstructor): boolean => item.uniqueId === dropId);

    const updatedIngredients = [...otherIngredients];
    const [draggedIngredient] = updatedIngredients.splice(dragIndex, 1);

    updatedIngredients.splice(dropIndex, 0, draggedIngredient);

    dispatch(updateOtherIngredients(updatedIngredients));
  }, [otherIngredients, dispatch]);

  const handleDeleteIngredient = (uniqueId: string, ingredientId: string) => {
    dispatch(removeIngredient(uniqueId));
    dispatch(decreaseIngredientCount(ingredientId));
  };

  const handleOrder = React.useCallback(
    (): void => {
      if (!buns) return;

      if (!isAuthorized) {
        navigate('/login');
        return;
      }
      dispatch(postOrder({ buns, otherIngredients }));
    },
    [buns, isAuthorized, dispatch, otherIngredients, navigate]
  );

  const handleCloseModal = React.useCallback(
    (): void => {
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
                          .map((ingredient) => (
                            <ConstructorIngredient
                            key={'constructor-ingredient-' + ingredient.uniqueId }
                            sortIngredient={sortIngredient}
                            onDelete={handleDeleteIngredient}
                            ingredient={ingredient}/>
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
        onClick={handleOrder}
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
