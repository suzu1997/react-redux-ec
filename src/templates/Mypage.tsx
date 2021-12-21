import { VFC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import EditIcon from '@material-ui/icons/Edit';

import { RootState } from '../reducks/store/store';
import { getUserInfo } from '../reducks/users/selectors';

const Mypage: VFC = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const userInfo = getUserInfo(selector);

  const email = userInfo.email || '未登録';
  const zipcode = userInfo.zipcode || '未登録';
  const address = userInfo.address || '未登録';
  const birthDate = userInfo.birthDate || '未登録';
  const phone = userInfo.phone || '未登録';

  return (
    <section className='mx-auto my-0 max-w-xl relative py-0 px-4 text-center w-full sm:max-w-5xl'>
      <h1 className='text-blue-500 text-2xl mt-0 mx-auto mb-4'>会員情報</h1>
      <div className='w-3/4 shadow h-auto mx-auto text-left p-5 flex flex-col'>
        <button
          className='border border-gray-400 p-2 rounded-md ml-auto cursor-pointer hover:bg-gray-100'
          onClick={() => dispatch(push('/user/myPage/edit'))}
        >
          <span className='mr-2'>会員情報の変更</span>
          <EditIcon />
        </button>
        <div>
          <h2 className='text-xl'>名前</h2>
          <p className='text-gray-500 text-xl mb-3'>{userInfo.username}</p>
          <h2 className='text-xl'>メールアドレス</h2>
          <p className='text-gray-500 text-xl mb-3'>{email}</p>
          <h2 className='text-xl'>郵便番号</h2>
          <p className='text-gray-500 text-xl mb-3'>{zipcode}</p>
          <h2 className='text-xl'>住所</h2>
          <p className='text-gray-500 text-xl mb-3'>{address}</p>
          <h2 className='text-xl'>電話番号</h2>
          <p className='text-gray-500 text-xl mb-3'>{phone}</p>
          <h2 className='text-xl'>生年月日</h2>
          <p className='text-gray-500 text-xl mb-3'>{birthDate}</p>
        </div>
      </div>
    </section>
  );
};
export default Mypage;
