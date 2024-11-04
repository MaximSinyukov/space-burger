import React from 'react';
import { useDrag, useDrop } from "react-dnd";
import PropTypes from 'prop-types';

import constructorIngredientStyle from './constructor-ingredient.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { IngredientType } from 'utils/constants/types.js';

const ConstructorIngredient = React.memo(function ConstructorIngredient({ ingredient, onDelete, sortIngredient }) {
  const ingredientConsctructorRef = React.useRef(null);

  const [, dragRef] = useDrag({
    type: "constructor",
    item: () => {
      return { uniqueId: ingredient.uniqueId };
    },
  });

  const [{isHover}, dropRef] = useDrop({
    accept: "constructor",
    drop(item) {
      if (!ingredientConsctructorRef.current) return;

      const dragIndex = item.uniqueId;
      const dropIndex = ingredient.uniqueId;

      if (dragIndex === dropIndex) return;

      sortIngredient(dragIndex, dropIndex);
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
  });

  dragRef(dropRef(ingredientConsctructorRef));

  return (
    <li
    ref={ingredientConsctructorRef}
    className={`${constructorIngredientStyle['burger-constructor__ingredient']}`}>
      <DragIcon
      className="mr-2"
      type="primary"/>

      <ConstructorElement
      text={ingredient.name}
      price={ingredient.price}
      thumbnail={ingredient.image_mobile}
      handleClose={() => {onDelete(ingredient.uniqueId, ingredient._id)}}
      extraClass={`${constructorIngredientStyle['burger-constructor__constructor-ingredient']} ${isHover && constructorIngredientStyle['burger-constructor__constructor-ingredient_active']}`}/>
    </li>
  );
});

ConstructorIngredient.propTypes = {
  ingredient: IngredientType.isRequired,
  onDelete: PropTypes.func.isRequired,
  sortIngredient: PropTypes.func.isRequired,
};

export default ConstructorIngredient;
