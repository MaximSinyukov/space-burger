import React from 'react';
import { useDrag, useDrop } from "react-dnd";

import constructorIngredientStyle from './constructor-ingredient.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { TIngredientConstructor } from 'utils/constants/types';

type TDragItem = {
  uniqueId: string;
};

type TDropCollectedProps = {
  isHover: boolean,
};

type TConstructorIngredientProps = {
  ingredient: TIngredientConstructor;
  onDelete: (uniqId: string, ingredientId: string) => void;
  sortIngredient: (dragIndex: string, dropIndex: string) => void;
};

const ConstructorIngredient = React.memo(function ConstructorIngredient({ ingredient, onDelete, sortIngredient }: TConstructorIngredientProps) {
  const ingredientConsctructorRef = React.useRef<HTMLLIElement>(null);

  const [, dragRef] = useDrag<TDragItem>({
    type: "constructor",
    item: () => {
      return { uniqueId: ingredient.uniqueId };
    },
  });

  const [{ isHover }, dropRef] = useDrop<TDragItem, void, TDropCollectedProps>({
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

export default ConstructorIngredient;
