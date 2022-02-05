import Cookies from 'js-cookie';

const TokenKey = 'CatHatMusic-token';
const UserKey = 'current-user';

export const getToken = () => {
  return Cookies.get(TokenKey);
};

export const setToken = token => {
  return Cookies.set(TokenKey, token);
};

export const removeToken = () => {
  return Cookies.remove(TokenKey);
};

export const getCurrentUser = () => {
  const user = Cookies.get(UserKey);
  return user === undefined ? null : JSON.parse(user);
};

export const setCurrentUser = currentUser => {
  return Cookies.set(UserKey, JSON.stringify(currentUser));
};

export const removeCurrentUser = () => {
  Cookies.remove(UserKey);
};
