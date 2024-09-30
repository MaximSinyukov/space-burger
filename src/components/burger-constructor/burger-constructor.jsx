import burgerConstructorStyle from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import fakeData from 'utils/ingredientsList.json';

function BurgerConstructor() {
  return (
    <section
    className={`mt-25 ${burgerConstructorStyle['burger-constructor']}`}>
      <div
      className={`pl-8 ${burgerConstructorStyle['burger-constructor__ingredients']}`}>
        <ConstructorElement
        type="top"
        isLocked={true}
        text={fakeData[0].name}
        price={fakeData[0].price}
        thumbnail={fakeData[0].image_mobile}/>

        <ul
        className={`${burgerConstructorStyle['burger-constructor__main-ingredients']}`}>
          {
            fakeData.slice(1, fakeData.length - 2)
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

        <ConstructorElement
        type="bottom"
        isLocked={true}
        text={fakeData[fakeData.length - 1].name}
        price={fakeData[fakeData.length - 1].price}
        thumbnail={fakeData[fakeData.length - 1].image_mobile}/>
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
}

export default BurgerConstructor;
