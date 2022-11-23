// export interface InewColumn {
//   idBoard: string;
//   title: string;
// }
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

// export interface IColumns {
//   columns: IColumn[];
//   isCreated: boolean;
// }
