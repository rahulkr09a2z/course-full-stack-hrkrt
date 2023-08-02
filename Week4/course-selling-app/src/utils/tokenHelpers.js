import { AUTH_TOKEN_KEY } from "@courseApp/constants/projectKeys.js";

export const getBearerToken = async () => {
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
  if (authToken) {
    Promise.resolve(authToken);
  } else {
    Promise.reject("Token not Found");
  }
};

export const setBearerToken = async (token) => {
  if (token && token.length) {
    localStorage.setItem(AUTH_TOKEN_KEY,token);
    Promise.resolve();
  } else {
    Promise.reject();
  }
};
