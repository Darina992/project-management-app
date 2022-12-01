import { isExpired, decodeToken } from 'react-jwt';
import { useJwt } from 'react-jwt';

export function setToLocalStorage(key: string, value: string) {
  window.localStorage.setItem(key, value);
}

export function getFromLocalStorage(key: string) {
  return window.localStorage.getItem(key);
}

type DecodedToken = {
  userId: string;
  login: string;
  iat: number;
};

export function isValidToken() {
  const token = localStorage.getItem('$token') as string;
  const myDecodedToken: DecodedToken | null = decodeToken(token);
  const currentTime = new Date().getTime();
  const expTokenTime12Hours = new Date(myDecodedToken!.iat * 1000).getTime() + 43200000;
  if (currentTime > expTokenTime12Hours) {
    console.log('Token expired.');
    return false;
  } else {
    console.log('Valid token');
    return true;
  }
}

export function updateUserIdFromToken() {
  const token = localStorage.getItem('$token') as string;
  const myDecodedToken: DecodedToken | null = decodeToken(token);
  if (myDecodedToken) {
    setToLocalStorage('$userId', myDecodedToken!.userId);
    return myDecodedToken!.userId;
  }
  return '';
}
