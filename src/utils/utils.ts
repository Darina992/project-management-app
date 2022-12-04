import { decodeToken } from 'react-jwt';

import { IColumn, ITask } from 'api/typesApi';
import { DraggableStateSnapshot, DraggingStyle } from 'types/dropAndDragTypes';

export function setToLocalStorage(key: string, value: string) {
  window.localStorage.setItem(key, value);
}

export function getFromLocalStorage(key: string) {
  return window.localStorage.getItem(key);
}

export const sorted = (arr: IColumn[] | ITask[]) => {
  return arr.sort((el1: IColumn | ITask, el2: IColumn | ITask) =>
    el1['order'] > el2['order'] ? 1 : -1
  );
};

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

export const getStyle = (style: DraggingStyle, snapshot: DraggableStateSnapshot) => {
  if (!snapshot.isDropAnimating) {
    return style;
  }
  return {
    ...style,
    transitionDuration: `0.5s`,
  };
};
