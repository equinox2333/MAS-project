export interface LoginParams {
  email: string;
  password: string;
}

export interface RegisterParams extends LoginParams {
  username: string;
}
