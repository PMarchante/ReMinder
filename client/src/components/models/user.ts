export interface IUser {
  username: string;
  displayname: string;
  token: string;
  email: string;
}

export interface IUserFormValues {
  email: string;
  password: string;
  displayName?: string;
  username?: string;
}
