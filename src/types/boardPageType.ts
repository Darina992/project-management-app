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
