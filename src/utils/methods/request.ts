import { BASE_URL } from "../constants/constants";

type TResponse = {
  ok: boolean;
  json: () => Promise<any>;
  success?: boolean;
  [key: string]: any;
};

const checkResponse = (res: TResponse): Promise<any> => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(res);
};

const checkSuccess = (res: any): any => {
  if (res && res.success) {
    return res;
  }

  return Promise.reject(res);
};

export function request(endpoint: string, options: RequestInit): Promise<any> {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
}
