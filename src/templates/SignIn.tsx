import { useCallback, useState, VFC } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

import { TextInput } from '../components/Uikit/TextInput';
import { PrimaryButton } from '../components/Uikit/PrimaryButton';
import { signIn } from '../reducks/users/operations';

const SignIn: VFC = () => {
  const dispatch = useDispatch();

  // メールアドレス
  const [email, setEmail] = useState<string>('');
  // パスワード
  const [password, setPassword] = useState<string>('');

  /**
   * 入力されたメールアドレスをセット.
   */
  const inputEmail = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [setEmail]
  );
  /**
   * 入力されたパスワードをセット.
   */
  const inputPassword = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    [setPassword]
  );

  return (
    <div className='mx-auto my-0 max-w-md p-4 h-auto w-[calc(100%_-_2rem)]'>
      <h2 className='text-blue-500 text-2xl mt-0 mx-auto mb-12 text-center'>
        サインイン
      </h2>
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
        label={'パスワード'}
        multiline={false}
        required={true}
        rows={1}
        value={password}
        type={'password'}
        onChange={inputPassword}
      />
      <div className='h-8 sm:h-12' />
      <div className='mx-auto my-0 text-center'>
        <PrimaryButton
          label='SIGN IN'
          onClick={() => dispatch(signIn(email, password))}
        />
        <p onClick={() => dispatch(push('/signup'))} className='cursor-pointer underline hover:opacity-70 mb-5'>
          アカウントをお持ちでない方はこちら
        </p>
        <p onClick={() => dispatch(push('/signin/resetPassword'))} className='cursor-pointer underline hover:opacity-70'>
          パスワードをお忘れですか？再設定はこちら
        </p>
      </div>
    </div>
  );
};

export default SignIn;
