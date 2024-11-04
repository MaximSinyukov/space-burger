import { BASE_URL } from "../constants/constants";

export function request(endpoint, options) {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(res => res.json());
}
