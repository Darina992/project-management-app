export interface InewColumn {
  idBoard: string;
  title: string;
}

export interface IColumn {
  id: string;
  title: string;
  order: number;
}

export interface IColumns {
  columns: IColumn[];
  isCreated: boolean;
  openModal: boolean;
  idBoard: string;
}

export interface IFormInput {
  name: string;
}
export interface IFormBoardCreate {
  name: string;
  description: string;
}

export interface IGetColumn {
  boardId: string;
  columnId: string;
}

export interface IBodyTask {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId?: string;
  columnId?: string;
}
