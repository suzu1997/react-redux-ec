export type Action = {
  type: string;
  payload: any;
}

export type UserState = {
  isSignedIn: boolean;
  uid: string;
  username: string;
  role: string;
}