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
    dispatch(fetchProducts(gender, category, keyword));
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, gender, category, keyword]);

  return (
    <section className='mx-auto my-0 max-w-xl py-0 px-4 text-center w-full sm:max-w-5xl flex'>
      
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
