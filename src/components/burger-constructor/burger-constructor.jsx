import React from 'react';
import burgerConstructorStyle from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructor = React.memo(function BurgerConstructor({ ingredients }) {
  const [ingredientsData, setIngredientsData] = React.useState({
    buns: [],
    otherIngredients: [],
  });

  React.useEffect(() => {
    const newIngredients = {
      buns: [],
      otherIngredients: [],
    };

    ingredients?.forEach((ingredient) => {
      if (ingredient.type === 'bun') {
        newIngredients.buns.push(ingredient);
        return;
      }

      newIngredients.otherIngredients.push(ingredient);
      setIngredientsData(newIngredients);
    });
  }, [ingredients]);

  return (
    <section
    className={`mt-25 ${burgerConstructorStyle['burger-constructor']}`}>
      <div
      className={`pl-8 ${burgerConstructorStyle['burger-constructor__ingredients']}`}>
        {ingredientsData.buns[0]
          &&  (
                <ConstructorElement
                type="top"
                isLocked={true}
                text={ingredientsData.buns[0].name}
                price={ingredientsData.buns[0].price}
                thumbnail={ingredientsData.buns[0].image_mobile}/>
              )
        }

        <ul
        className={`${burgerConstructorStyle['burger-constructor__main-ingredients']}`}>
          {
            ingredientsData.otherIngredients
              .map((ingredient) => (
                <li
                key={'order-ingredient-' + ingredient._id}
                className={burgerConstructorStyle['burger-constructor__ingredient']}>
                  <DragIcon
                  className="mr-2"
                  type="primary"/>

                  <ConstructorElement
                  text={ingredient.name}
                  price={ingredient.price}
                  thumbnail={ingredient.image_mobile}/>
                </li>
              ))
          }
        </ul>

        {ingredientsData.buns[1]
          &&  (
                <ConstructorElement
                type="bottom"
                isLocked={true}
                text={ingredientsData.buns[1].name}
                price={ingredientsData.buns[1].price}
                thumbnail={ingredientsData.buns[1].image_mobile}/>
              )
        }
      </div>

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
        htmlType="button"
        type="primary"
        size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
});

export default BurgerConstructor;