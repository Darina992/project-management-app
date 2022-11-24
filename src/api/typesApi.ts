export type IUser = {
  id: string;
  name: string;
  login: string;
};

export type INewUser = {
  name: string;
  login: string;
  password: string;
};

export type IAuthUser = {
  login: string;
  password: string;
};

export type IToken = {
  token: string;
};

export type ITask = {
  id: string;
  title: string;
  description: string;
  userId: string;
};

export type INewTask = {
  boardId: string;
  columnId: string;
  title: string;
  description: string;
  userId: string;
};
