import configureMockStore from "redux-mock-store";
import reducer, {
  connect,
  disconnect,
  sendMessage,
  onOpen,
  onClose,
  onMessage,
  onError,
} from "./orderWebsocket";

const initialState = {
  isConnected: false,
  data: null,
  error: null,
};

const mockStore = configureMockStore();

describe("orderWebsocket reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should create connect action", () => {
    const action = connect("ws://test-websocket");

    expect(action.type).toBe("orderWebsocket/connect");
    expect(action.payload).toBe("ws://test-websocket");
  });

  it("should create disconnect action", () => {
    const action = disconnect();

    expect(action.type).toBe("orderWebsocket/disconnect");
  });

  it("should create sendMessage action", () => {
    const payload = "TEST MESSAGE";
    const action = sendMessage(payload);

    expect(action.type).toBe("orderWebsocket/sendMessage");
    expect(action.payload).toEqual(payload);
  });

  it("should handle onOpen", () => {
    expect(reducer(initialState, onOpen())).toEqual({
      isConnected: true,
      data: null,
      error: null,
    });
  });

  it("should handle onClose", () => {
    expect(reducer({ ...initialState, isConnected: true }, onClose()))
      .toEqual({
        isConnected: false,
        data: null,
        error: null,
      });
  });

  it("should handle onMessage", () => {
    const payload = { orders: [], total: 0, totalToday: 0 };

    expect(reducer(initialState, onMessage(payload))).toEqual({
      isConnected: false,
      data: { orders: [], total: 0, totalToday: 0 },
      error: null,
    });
  });

  it("should handle onError", () => {
    const payload = "TEST ERROR";

    expect(reducer(initialState, onError(payload))).toEqual({
      isConnected: false,
      data: null,
      error: payload,
    });
  });

  it("should dispatch action in mock store", () => {
    const store = mockStore(initialState);
    store.dispatch(connect("ws://mock-websocket"));

    expect(store.getActions()[0]).toEqual(connect("ws://mock-websocket"));
  });
});
