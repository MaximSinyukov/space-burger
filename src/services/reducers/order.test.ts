import configureMockStore from "redux-mock-store";
import reducer, { setOrderNumber, removeOrderNumber } from "./order";

const mockStore = configureMockStore();
const payloadOrderNumber = 123;

describe("order reducer", () => {
  it("should return the initial state", () => {
    const unknownAction = { type: "unknown" };

    expect(reducer(undefined, unknownAction)).toEqual(null);
  });

  it("should handle setOrderNumber action", () => {
    const action = setOrderNumber(payloadOrderNumber);

    expect(action.type).toBe("order/setOrderNumber");
    expect(action.payload).toBe(payloadOrderNumber);
  });

  it("should handle removeIngredientDetails action", () => {
    expect(reducer(payloadOrderNumber, removeOrderNumber())).toEqual(null);
  });

  it("should dispatch action in mock store", () => {
    const store = mockStore(null);
    store.dispatch(setOrderNumber(payloadOrderNumber));

    expect(store.getActions()[0]).toEqual(setOrderNumber(payloadOrderNumber));
  });
});
