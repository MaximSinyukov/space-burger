import { BASE_URL } from "../constants/constants";

type TResponse = {
  ok: boolean;
  json: () => Promise<any>;
  success?: boolean;
  [key: string]: any;
};

type TResponseJson = Response & {
  success: boolean;
};

const checkResponse = async (res: TResponse): Promise<any> => {
  if (res.ok) {
    return res.json();
  }

  const error = await res.json();
  return Promise.reject(error);
};

const checkSuccess = (res: TResponseJson): TResponseJson | Promise<any> => {
  if (res && res.success) {
    return res;
  }

  return Promise.reject(res);
};

export function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
}
