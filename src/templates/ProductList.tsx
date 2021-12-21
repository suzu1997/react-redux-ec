import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState, VFC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ProductCard } from '../components/Products/ProductCard';
import { SelectBox } from '../components/Uikit/SelectBox';
import { auth, db } from '../firebase';
import { fetchProducts } from '../reducks/products/operations';
import { getProductList } from '../reducks/products/selectors';
import { RootState } from '../reducks/store/store';
import { signInAction } from '../reducks/users/actions';

const ProductList: VFC = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const products = getProductList(selector);

  // 商品の並び順
  const [order, setOrder] = useState<string>('time');

  // 並び替えのオプション
  const orderOptions = [
    { id: 'time', name: '更新順' },
    { id: 'expensive', name: '価格:高い順' },
    { id: 'inexpensive', name: '価格:安い順' },
  ];

  // URLからクエリパラメータを取得
  const query = selector.router.location.search;

  // クエリパラメータの先頭が?gender=なら、クエリをsplitしてジェンダーフィルターを取得
  const gender = /^\?gender=/.test(query) ? query.split('?gender=')[1] : '';

  // クエリパラメータの先頭が?category=なら、クエリをsplitしてカテゴリフィルターを取得
  const category = /^\?category=/.test(query)
    ? query.split('?category=')[1]
    : '';

  // クエリパラメータの先頭が?q=なら、クエリをsplitしてキーワード検索フィルターを取得
  const keyword = /^\?q=/.test(query) ? query.split('?q=')[1] : '';

  // 表示する商品を取得
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // ユーザーがログインしている場合
        const uid = user.uid;
        // ユーザーの情報を取得
        getDoc(doc(db, 'users', uid)).then((snapshot) => {
          const userData = snapshot.data();
          if (userData) {
            // ストアの中身を更新
            dispatch(
              signInAction({
                address: userData.address,
                birthDate: userData.birthDate,
                cart: userData.cart,
                email: userData.email,
                isSignedIn: true,
                orders: userData.orders,
                phone: userData.phone,
                role: userData.role,
                uid: uid,
                username: userData.username,
                zipcode: userData.zipcode,
              })
            );
          }
        });
      }
    });
    dispatch(fetchProducts(gender, category, keyword, order));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, gender, category, keyword, order]);

  return (
    <section className='mx-auto my-0 max-w-xl py-0 px-4 text-center w-full sm:max-w-5xl'>
      <div className='text-left ml-5'>
        {keyword && (
          <div className='text-xl mb-4'>
            <span className='font-bold'>{keyword}</span>の検索結果
          </div>
        )}
      </div>
      <div className='flex items-center'>
        <p className='ml-5'>{products.length}件</p>
        <div className='w-1/2 ml-auto mr-5 md:w-60'>
          <SelectBox
            label={'並び替え'}
            required={false}
            value={order}
            select={setOrder}
            options={orderOptions}
          />
        </div>
      </div>
      <div className='flex flex-row flex-wrap'>
        {products.length > 0 &&
          products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
      </div>
    </section>
  );
};

export default ProductList;
