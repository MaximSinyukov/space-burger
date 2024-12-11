import configureMockStore from "redux-mock-store";
import reducer, {
  setIngredientDetails,
  removeIngredientDetails,
} from "./detail-ingredient";

const mockStore = configureMockStore();
const payloadIngredient = {
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
};

describe("detailIngredient reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(null);
  });

  it("should handle setIngredientDetails action", () => {
    const action = setIngredientDetails(payloadIngredient);

    expect(action.type).toBe("detailIngredient/setIngredientDetails");
    expect(action.payload).toBe(payloadIngredient);
  });

  it("should handle removeIngredientDetails action", () => {
    expect(reducer(payloadIngredient, removeIngredientDetails()))
      .toEqual(null);
  });

  it("should dispatch action in mock store", () => {
    const store = mockStore(null);
    store.dispatch(setIngredientDetails(payloadIngredient));

    expect(store.getActions()[0]).toEqual(setIngredientDetails(payloadIngredient));
  });
});
