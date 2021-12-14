// initialState 
// Storeの初期状態を定義する

const initialState = {
  // カテゴリに分けて、オブジェクトで記述
  products: {
    list: [],
  },
  users: {
    cart: [],
    isSignedIn: false,
    role: '',
    uid: '',
    username: ''
  }
};

export default initialState