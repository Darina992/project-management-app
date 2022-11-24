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

export type INewTask = {
  boardId: string;
  columnId: string;
  title: string;
  description: string;
  userId: string;
};

export interface IBoard {
  id: string;
  title: string;
  description: string;
  columns: IColumn[];
}
export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  files: IFile[];
}
export interface IColumn {
  id: string;
  title: string;
  order: number;
  tasks?: ITask[];
}

export interface IFile {
  filename: string;
  fileSize: number;
}
