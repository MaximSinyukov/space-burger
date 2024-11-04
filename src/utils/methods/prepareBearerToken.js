export function prepareBearerToken(token) {
  let authToken;

  if (token.indexOf('Bearer') === 0) {
    authToken = token.split('Bearer ')[1];
  }

  return authToken;
};
