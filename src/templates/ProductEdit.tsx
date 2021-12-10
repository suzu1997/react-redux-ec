import { useCallback, useState, VFC } from 'react';
import { useDispatch } from 'react-redux';

import { TextInput } from '../components/Uikit/TextInput';
import { SelectBox } from '../components/Uikit/SelectBox';
import { PrimaryButton } from '../components/Uikit/PrimaryButton';
import { saveProduct } from '../reducks/products/operations';

const ProductEdit: VFC = () => {
  const dispatch = useDispatch();

  const [productName, setProductName] = useState<string>('');
  const [productDescription, setProductDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  const inputProductName = useCallback(
    (e) => {
      setProductName(e.target.value);
    },
    [setProductName]
  );
  const inputProductDescription = useCallback(
    (e) => {
      setProductDescription(e.target.value);
    },
    [setProductDescription]
  );
  const inputPrice = useCallback(
    (e) => {
      setPrice(e.target.value);
    },
    [setPrice]
  );

  const categories = [
    { id: 'tops', name: 'トップス' },
    { id: 'shirts', name: 'シャツ' },
    { id: 'pants', name: 'パンツ' },
    { id: 'skirt', name: 'スカート' },
  ];
  const genders = [
    { id: 'all', name: 'すべて' },
    { id: 'men', name: 'メンズ' },
    { id: 'women', name: 'レディース' },
  ];

  return (
    <section>
      <h2 className='u-text__headline u-text-center'>商品の登録・編集</h2>
      <div className='c-section-container'>
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
        <div className='module-spacer--medium' />
        <div className='center'>
          <PrimaryButton
            label={'商品情報を保存'}
            onClick={() =>
              dispatch(
                saveProduct(
                  productName,
                  productDescription,
                  category,
                  gender,
                  price
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
