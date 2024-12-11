import configureMockStore from "redux-mock-store";
import reducer, {
  setIngredients,
} from "./ingredients";

const mockStore = configureMockStore();
const payloadIngredients = [
  {
    _id: 'test',
    name: 'test',
    type: 'bun',
    proteins: 1000,
    fat: 1000,
    carbohydrates: 1000,
    calories: 3000,
    price: 1111,
    image: 'http://test',
    image_mobile: 'http://test',
    image_large: 'http://test',
    __v: '1111111',
  },
  {
    _id: 'test1',
    name: 'test1',
    type: 'sauce',
    proteins: 10001,
    fat: 10001,
    carbohydrates: 10001,
    calories: 30001,
    price: 111112,
    image: 'http://test1',
    image_mobile: 'http://test1',
    image_large: 'http://test1',
    __v: '11111112',
  },
];

describe("ingredients reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it("should handle setIngredients action", () => {
    const action = setIngredients(payloadIngredients);

    expect(action.type).toBe("ingredients/setIngredients");
    expect(action.payload).toBe(payloadIngredients);
  });

  it("should dispatch action in mock store", () => {
    const store = mockStore([]);
    store.dispatch(setIngredients(payloadIngredients));

    expect(store.getActions()[0])
      .toEqual(setIngredients(payloadIngredients));
  });
});
