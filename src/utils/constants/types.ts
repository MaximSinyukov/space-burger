import PropTypes from "prop-types";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export const IngredientType = PropTypes.shape({
  // TODO delete after remove prop-types
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["bun", "sauce", "main"]).isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
});

export type TIcon = typeof BurgerIcon;
export type TIngredientType = "bun" | "sauce" | "main";

export type TIngredient = {
  _id: string;
  name: string;
  type: TIngredientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type TIngredientConstructor = TIngredient & {
  uniqueId: string;
};
