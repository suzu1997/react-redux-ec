export type Action = {
  type: string;
  payload: any;
}

export type UserState = {
  uid: string;
  username: string;
}