export interface IBoard {
  id: string;
  title: string;
  description: string;
}
export interface IBoards {
  boards: IBoard[];
  isCreated?: boolean;
  boardsInline: IBoard[];
  openSnackbar: boolean;
  errorMessage: string;
}

export interface INewBoard {
  title: string;
  description: string;
}
