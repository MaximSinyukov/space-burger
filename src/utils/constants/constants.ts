export const BASE_URL: string = "https://norma.nomoreparties.space/api";

export const orderStatusText: Readonly<{
  // TODO after websocket
  [statusName: string]: string;
}> = {
  done: "Выполнен",
  inProgress: "Готовится",
  created: "Создан",
};
