import { get, post } from './request';

export const createToken = (username, password) => {
  return post('/tokens', { username, password });
};
