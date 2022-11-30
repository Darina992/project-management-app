import { IColumn, ITask } from 'api/typesApi';

export function setToLocalStorage(key: string, value: string) {
  window.localStorage.setItem(key, value);
}

export function getFromLocalStorage(key: string) {
  return window.localStorage.getItem(key);
}

export const sorted = (arr: IColumn[] | ITask[]) => {
  return arr.sort((el1: IColumn, el2: IColumn) => (el1['order'] > el2['order'] ? 1 : -1));
};
