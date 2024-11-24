import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export type TIcon = typeof BurgerIcon;
export type TIngredientType = "bun" | "sauce" | "main";

export type TIngredient = Readonly<{
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
}>;

export type TIngredientConstructor = TIngredient & {
  uniqueId: string;
};

export type TStoreAuthorization = {
  isAuthorized: boolean;
};

export type TStoreIngredients = TIngredient[];

export type TIconInputProps = "HideIcon" | "ShowIcon" | "EditIcon";

export type TInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon?: TIconInputProps;
  extraClass?: string;
  isIcon?: boolean;
  disabled?: boolean;
  onIconClick?: () => void;
  onBlur?: () => void;
};

export type TUniversalFormData = Readonly<{
  submitHandler: () => void;
  resetHandler?: () => void;
  inputsData: {
    type: "email" | "password" | "default";
    props: TInputProps;
  }[];
  linksData?: {
    baseText: string;
    linkText: string;
    route: string;
  }[];
  textData?: {
    title?: string;
    btn?: string;
  };
  children?: React.ReactNode;
}>;
