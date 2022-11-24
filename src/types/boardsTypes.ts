export interface IBoard {
  id: string;
  title: string;
  description: string;
}
export interface IBoards {
  boards: IBoard[];
  isCreated?: boolean;
}

export interface INewBoard {
  title: string;
  description: string;
}
