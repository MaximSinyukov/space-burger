import configureMockStore from "redux-mock-store";
import reducer, {
  selectIngredient,
  removeIngredient,
  updateOtherIngredients,
  selectBuns,
  increaseIngredientCount,
  decreaseIngredientCount,
  resetSelectIngredients,
} from "./select-ingredients";
import { TIngredientConstructor } from "utils/constants/types";

const mockStore = configureMockStore();
const initialState = {
  buns: null,
  otherIngredients: [],
  ingredientsCounter: {},
};
const payloadIngredients: TIngredientConstructor[] = [
  {
    _id: "test",
    name: "test",
    type: "bun",
    proteins: 1000,
    fat: 1000,
    carbohydrates: 1000,
    calories: 3000,
    price: 1111,
    image: "http://test",
    image_mobile: "http://test",
    image_large: "http://test",
    __v: 1111111,
    uniqueId: "1",
  },
  {
    _id: "test1",
    name: "test1",
    type: "sauce",
    proteins: 10001,
    fat: 10001,
    carbohydrates: 10001,
    calories: 30001,
    price: 111112,
    image: "http://test1",
    image_mobile: "http://test1",
    image_large: "http://test1",
    __v: 11111112,
    uniqueId: "2",
  },
];

describe("selectIngredients reducer", () => {
  it("should return the initial state", () => {
    const unknownAction = { type: "unknown" };

    expect(reducer(undefined, unknownAction)).toEqual(initialState);
  });

  it("should handle selectIngredient action", () => {
    expect(
      reducer(
        { ...initialState, otherIngredients: [payloadIngredients[0]] },
        selectIngredient(payloadIngredients[1])
      )
    ).toEqual({
      ...initialState,
      otherIngredients: payloadIngredients,
    });
  });

  it("should handle removeIngredient action", () => {
    expect(
      reducer(
        { ...initialState, otherIngredients: payloadIngredients },
        removeIngredient("1")
      )
    ).toEqual({
      ...initialState,
      otherIngredients: [payloadIngredients[1]],
    });
  });

  it("should handle updateOtherIngredients action", () => {
    expect(
      reducer(
        { ...initialState, otherIngredients: [payloadIngredients[0]] },
        updateOtherIngredients(payloadIngredients)
      )
    ).toEqual({
      ...initialState,
      otherIngredients: payloadIngredients,
    });
  });

  it("should handle selectBuns action", () => {
    expect(reducer(initialState, selectBuns(payloadIngredients[0]))).toEqual({
      ...initialState,
      buns: payloadIngredients[0],
    });
  });

  it("should handle increaseIngredientCount action", () => {
    expect(reducer(initialState, increaseIngredientCount("test1"))).toEqual({
      ...initialState,
      ingredientsCounter: {
        test1: 1,
      },
    });
  });

  it("should handle decreaseIngredientCount action", () => {
    expect(
      reducer(
        {
          ...initialState,
          ingredientsCounter: {
            test1: 10,
          },
        },
        decreaseIngredientCount("test1")
      )
    ).toEqual({
      ...initialState,
      ingredientsCounter: {
        test1: 9,
      },
    });
  });

  it("should handle resetSelectIngredients action", () => {
    expect(
      reducer(
        {
          ...initialState,
          otherIngredients: [payloadIngredients[0]],
          ingredientsCounter: {
            test1: 10,
          },
        },
        resetSelectIngredients()
      )
    ).toEqual(initialState);
  });

  it("should dispatch action in mock store", () => {
    const store = mockStore([]);
    store.dispatch(selectIngredient(payloadIngredients[1]));

    expect(store.getActions()[0]).toEqual(
      selectIngredient(payloadIngredients[1])
    );
  });
});
