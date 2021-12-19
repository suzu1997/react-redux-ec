import { useEffect, VFC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductCard } from '../components/Products/productCard';
import { fetchProducts } from '../reducks/products/operations';
import { getProductList } from '../reducks/products/selectors';
import { RootState } from '../reducks/store/store';

const ProductList: VFC = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const products = getProductList(selector);

  const [order, setOrder] = useState<string>('time');

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
  console.log({ keyword });

  useEffect(() => {
    dispatch(fetchProducts(gender, category, keyword, order));

    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, gender, category, keyword, order]);

  return (

  return (
    <section className='mx-auto my-0 max-w-xl py-0 px-4 text-center w-full sm:max-w-5xl'>
      <div className='flex items-center'>
        <div className='text-left ml-5'>
          {keyword && (
            <div className='text-xl'>
              <span className='font-bold'>{keyword}</span>の検索結果
            </div>
          )}
          <p>{products.length}件</p>
        </div>
        <div className='w-60 ml-auto mr-5'>
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
