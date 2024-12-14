import configureMockStore from "redux-mock-store";
import reducer, {
  setUserAuthorization,
  setUserUnuthorization,
  setUserData,
  removeUserData,
} from "./user";

const mockStore = configureMockStore();
const initialState = {
  isAuthorized: false,
  userData: {},
};
const payloadUserData = {
  name: "Valery Borov",
  email: "valerajma@borov.com",
};

describe("user reducer", () => {
  it("should return the initial state", () => {
    const unknownAction = { type: "unknown" };

    expect(reducer(undefined, unknownAction)).toEqual(initialState);
  });

  it("should handle setUserAuthorization action", () => {
    expect(reducer(initialState, setUserAuthorization())).toEqual({
      ...initialState,
      isAuthorized: true,
    });
  });

  it("should handle setUserUnuthorization action", () => {
    expect(
      reducer({ ...initialState, isAuthorized: true }, setUserUnuthorization())
    ).toEqual({
      ...initialState,
      isAuthorized: false,
    });
  });

  it("should handle setUserData action", () => {
    expect(reducer(initialState, setUserData(payloadUserData))).toEqual({
      ...initialState,
      userData: payloadUserData,
    });
  });

  it("should handle removeUserData action", () => {
    expect(
      reducer({ ...initialState, userData: payloadUserData }, removeUserData())
    ).toEqual(initialState);
  });

  it("should dispatch action in mock store", () => {
    const store = mockStore([]);
    store.dispatch(setUserAuthorization());

    expect(store.getActions()[0]).toEqual(setUserAuthorization());
  });
});
