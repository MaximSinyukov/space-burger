export const BASE_URL: string = "https://norma.nomoreparties.space/api";

export const orderStatusText: Readonly<{
  [statusName: string]: string;
}> = {
  done: "Выполнен",
  pending: "Готовится",
  created: "Создан",
};
