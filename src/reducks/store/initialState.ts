// initialState 
// Storeの初期状態を定義する

const initialState = {
  // カテゴリに分けて、オブジェクトで記述
  products: {
    list: [],
  },
  users: {
    address: '',
    birthDate: '',
    cart: [],
    email: '',
    favorite: [],
    isSignedIn: false,
    orders: [],
    phone: '',
    role: '',
    uid: '',
    username: '',
    zipcode: '',
  }
};

export default initialState