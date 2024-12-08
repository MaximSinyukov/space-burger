export function prepareBearerToken(token: string): string {
  let authToken = token;

  if (token.indexOf("Bearer") === 0) {
    authToken = token.split("Bearer ")[1];
  }

  return authToken;
}
