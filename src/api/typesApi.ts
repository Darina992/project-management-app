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
