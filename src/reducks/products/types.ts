export type Action = {
  type: string;
  payload: any;
}

export type ProductsState = {
  list: Array<Product>;
}

export type Product = {
  productName: string;
  productDescription: string;
  category: string;
  gender: string;
  price: string;
  images: Array<Image>
  sizes: Array<Size>
}

export type Image = {
  id: string;
  path: string;
}

export type Size = {
  size: string;
  quantity: string;
}