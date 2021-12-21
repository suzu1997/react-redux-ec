import { push } from 'connected-react-router';
import { useCallback, useState, VFC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SmallButton } from '../components/Uikit/SmallButton';
import { TextInput } from '../components/Uikit/TextInput';

import { RootState } from '../reducks/store/store';
import { getUserInfo } from '../reducks/users/selectors';

const MypageEdit: VFC = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const userInfo = getUserInfo(selector);
  console.log(userInfo);

  const [name, setName] = useState(userInfo.username || '');
  const [email, setEmail] = useState(userInfo.email || '');
  const [phone, setPhone] = useState(userInfo.phone || '');
  const [zipcode, setZipcode] = useState(userInfo.zipcode || '');
  const [address, setAddress] = useState(userInfo.address || '');
  const [birthDate, setBirthDate] = useState(userInfo.birthDate || '');

  const inputName = useCallback(
    (e) => {
      setName(e.target.value);
    },
    [setName]
  );
  const inputEmail = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [setEmail]
  );
  const inputPhone = useCallback(
    (e) => {
      setPhone(e.target.value);
    },
    [setPhone]
  );
  const inputZipcode = useCallback(
    (e) => {
      setZipcode(e.target.value);
    },
    [setZipcode]
  );
  const inputAddress = useCallback(
    (e) => {
      setAddress(e.target.value);
    },
    [setAddress]
  );
  const inputBirthDate = useCallback(
    (e) => {
      setBirthDate(e.target.value);
    },
    [setBirthDate]
  );

  return (
    <section className='mx-auto my-0 max-w-xl relative py-0 px-4 text-center w-full sm:max-w-5xl'>
      <h1 className='text-blue-500 text-2xl mt-0 mx-auto mb-4'>
        会員情報の変更
      </h1>
      <div className='w-3/4 shadow h-auto mx-auto text-left p-5 flex flex-col'>
        <button
          className='border border-gray-400 p-2 rounded-md ml-auto cursor-pointer hover:bg-gray-100'
          onClick={() => dispatch(push('/user/myPage'))}
        >
          <span className='mr-2'>会員情報を保存</span>
        </button>
        <div>
          <TextInput
            fullWidth={true}
            label={'名前'}
            multiline={false}
            required={true}
            rows={1}
            value={name}
            type={'text'}
            onChange={inputName}
          />
          <TextInput
            fullWidth={true}
            label={'メールアドレス'}
            multiline={false}
            required={true}
            rows={1}
            value={email}
            type={'email'}
            onChange={inputEmail}
          />
          <TextInput
            fullWidth={true}
            label={'電話番号'}
            multiline={false}
            required={true}
            rows={1}
            value={phone}
            type={'text'}
            onChange={inputPhone}
          />
          <div className='flex items-baseline'>
            <TextInput
              fullWidth={false}
              label={'郵便番号'}
              multiline={false}
              required={true}
              rows={1}
              value={zipcode}
              type={'text'}
              onChange={inputZipcode}
            />
            <span className='ml-3'>
              <SmallButton
                label={'住所検索'}
                onClick={() => console.log('住所検索')}
              />
            </span>
          </div>
          <TextInput
            fullWidth={true}
            label={'住所'}
            multiline={false}
            required={true}
            rows={1}
            value={address}
            type={'text'}
            onChange={inputAddress}
          />
          <div className='text-gray-500 mt-5'>生年月日</div>
          <TextInput
            fullWidth={true}
            label={''}
            multiline={false}
            required={true}
            rows={1}
            value={birthDate}
            type={'date'}
            onChange={inputBirthDate}
          />
        </div>
      </div>
    </section>
  );
};

export default MypageEdit;
