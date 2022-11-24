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
}
