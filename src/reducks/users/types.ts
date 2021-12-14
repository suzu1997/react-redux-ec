import { Timestamp } from 'firebase/firestore'
import { Image } from '../products/types'

export type Action = {
  type: string;
  payload: any;
}

export type UserState = {
  isSignedIn: boolean;
  uid: string;
  username: string;
  role: string;
  cart: Array<ProductInCart>;
}

export type ProductInCart = {
  added_at: Timestamp,
  cartId: string,
  description: string,
  gender: string,
  images: Array<Image>,
  name: string,
  price: number,
  productId: string,
  quantity: number,
  size: string,
}