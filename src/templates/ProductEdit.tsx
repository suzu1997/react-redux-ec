import { useCallback, useEffect, useState, VFC } from 'react';
import { useDispatch } from 'react-redux';

import { TextInput } from '../components/Uikit/TextInput';
import { SelectBox } from '../components/Uikit/SelectBox';
import { PrimaryButton } from '../components/Uikit/PrimaryButton';
import { saveProduct } from '../reducks/products/operations';
import { ImageArea } from '../components/Products/ImageArea';
import { Category, Image, Size } from '../reducks/products/types';
import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  orderBy,
} from '@firebase/firestore';
import { db } from '../firebase';
import { SetSizeArea } from '../components/Products/SetSizeArea';

const ProductEdit: VFC = () => {
  const dispatch = useDispatch();

  // 商品画像
  const [images, setImages] = useState<Array<Image>>([]);
  // 商品名
  const [productName, setProductName] = useState<string>('');
  // 商品説明
  const [productDescription, setProductDescription] = useState<string>('');
  // 商品カテゴリ
  const [category, setCategory] = useState<string>('');
  // 表示する商品カテゴリ群
  const [categories, setCategoris] = useState<Array<Category>>([]);
  // 対象ジェンダー
  const [gender, setGender] = useState<string>('');
  // 商品価格
  const [price, setPrice] = useState<string>('');
  // サイズ
  const [sizes, setSizes] = useState<Array<Size>>([]);

  /**
   * 入力された商品名をセット
   */
  const inputProductName = useCallback(
    (e) => {
      setProductName(e.target.value);
    },
    [setProductName]
  );
  /**
   *  入力された商品説明をセット
   */
  const inputProductDescription = useCallback(
    (e) => {
      setProductDescription(e.target.value);
    },
    [setProductDescription]
  );
  /**
   * 入力された価格をセット
   */
  const inputPrice = useCallback(
    (e) => {
      setPrice(e.target.value);
    },
    [setPrice]
  );

  // 対象ジェンダー群
  const genders = [
    { id: 'all', name: 'すべて' },
    { id: 'men', name: 'メンズ' },
    { id: 'women', name: 'レディース' },
  ];

  // URLから変数:idを判定する
  let id = window.location.pathname.split('/product/edit')[1];
  if (id !== '') {
    id = id.split('/')[1];
  }
  // idがあれば、idにマッチする商品情報を取得して表示
  useEffect(() => {
    if (id !== '') {
      getDoc(doc(db, 'products', id)).then((snapshot) => {
        const product = snapshot.data();
        if (product) {
          setImages(product.images);
          setProductName(product.name);
          setProductDescription(product.description);
          setCategory(product.category);
          setGender(product.gender);
          setPrice(product.price);
          setSizes(product.sizes);
        }
      });
    }
  }, [id]);

  // マウント時、表示するカテゴリーの選択肢を取得
  useEffect(() => {
    const q = query(collection(db, 'categories'), orderBy('order', 'asc'));
    getDocs(q).then((snapshots) => {
      const categories: Array<any> = [];
      snapshots.forEach((snapshot) => {
        const data = snapshot.data();
        categories.push({
          id: data.id,
          name: data.name,
        });
      });
      setCategoris(categories);
    });
  }, []);

  return (
    <section className='mx-auto my-0 max-w-xl relative py-0 px-4 text-center w-full sm:max-w-5xl'>
      <h2 className='text-blue-500 text-2xl mt-0 mx-auto mb-4 text-center'>
        商品の登録・編集
      </h2>
      <div className='mx-auto my-0 max-w-md p-4 h-auto w-[calc(100%_-_2rem)]'>
        <ImageArea images={images} setImages={setImages} />
        <TextInput
          fullWidth={true}
          label={'商品名'}
          multiline={false}
          required={true}
          rows={1}
          value={productName}
          type={'text'}
          onChange={inputProductName}
        />
        <TextInput
          fullWidth={true}
          label={'商品説明'}
          multiline={true}
          required={true}
          rows={5}
          value={productDescription}
          type={'text'}
          onChange={inputProductDescription}
        />
        <SelectBox
          label={'カテゴリー'}
          required={true}
          value={category}
          select={setCategory}
          options={categories}
        ></SelectBox>
        <SelectBox
          label={'性別'}
          required={true}
          value={gender}
          select={setGender}
          options={genders}
        ></SelectBox>
        <TextInput
          fullWidth={true}
          label={'価格'}
          multiline={false}
          required={true}
          rows={1}
          value={price}
          type={'number'}
          onChange={inputPrice}
        />
        <div className='h-5 sm:h-8' />
        <SetSizeArea sizes={sizes} setSizes={setSizes} />
        <div className='h-5 sm:h-8' />
        <div className='mx-auto my-0 text-center'>
          <PrimaryButton
            label={'商品情報を保存'}
            onClick={() =>
              dispatch(
                saveProduct(
                  id,
                  images,
                  productName,
                  productDescription,
                  category,
                  gender,
                  price,
                  sizes
                )
              )
            }
          />
        </div>
      </div>
    </section>
  );
};

export default ProductEdit;
