import { useCallback, useState, VFC } from 'react';
import { TextInput } from '../components/Uikit/TextInput';
import { PrimaryButton } from '../components/Uikit/PrimaryButton';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../reducks/users/operations';
import { push } from 'connected-react-router';

const ResetPass: VFC = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>('');

  const inputEmail = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [setEmail]
  );

  return (
    <div className='mx-auto my-0 max-w-md p-4 h-auto w-[calc(100%_-_2rem)]'>
      <h2 className='text-blue-500 text-2xl mt-0 mx-auto mb-4 text-center'>パスワードのリセット</h2>
      <div className='h-8 sm:h-12' />

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
      <div className='h-8 sm:h-12' />
      <div className='mx-auto my-0 text-center'>
        <PrimaryButton
          label='Reset Password'
          onClick={() => dispatch(resetPassword(email))}
        />
        <p onClick={() => dispatch(push('/signin'))}>ログイン画面に戻る</p>
      </div>
    </div>
  );
};

export default ResetPass;
