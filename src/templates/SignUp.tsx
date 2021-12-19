import { useCallback, useState, VFC } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

import { TextInput } from '../components/Uikit/TextInput';
import { PrimaryButton } from '../components/Uikit/PrimaryButton';
import { signUp } from '../reducks/users/operations';

const SignUp: VFC = () => {
  const dispatch = useDispatch();

  // ユーザー名
  const [username, setUsername] = useState<string>('');
  // メールアドレス
  const [email, setEmail] = useState<string>('');
  // パスワード
  const [password, setPassword] = useState<string>('');
  // パスワード（確認）
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  /**
   * 入力されたユーザー名をセット.
   */
  const inputUsername = useCallback(
    (e) => {
      setUsername(e.target.value);
    },
    [setUsername]
  );
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
  /**
   * 入力されたパスワード（確認）をセット.
   */
  const inputConfirmPassword = useCallback(
    (e) => {
      setConfirmPassword(e.target.value);
    },
    [setConfirmPassword]
  );

  return (
    <div className='mx-auto my-0 max-w-md p-4 h-auto w-[calc(100%_-_2rem)]'>
      <h2 className='text-blue-500 text-2xl mt-0 mx-auto mb-4 text-center'>
        アカウント登録
      </h2>
      <div className='h-8 sm:h-12' />
      <TextInput
        fullWidth={true}
        label={'ユーザー名'}
        multiline={false}
        required={true}
        rows={1}
        value={username}
        type={'text'}
        onChange={inputUsername}
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
        label={'パスワード'}
        multiline={false}
        required={true}
        rows={1}
        value={password}
        type={'password'}
        onChange={inputPassword}
      />
      <TextInput
        fullWidth={true}
        label={'確認用パスワード'}
        multiline={false}
        required={true}
        rows={1}
        value={confirmPassword}
        type={'password'}
        onChange={inputConfirmPassword}
      />
      <div className='h-8 sm:h-12' />
      <div className='mx-auto my-0 text-center'>
        <PrimaryButton
          label='アカウントを登録する'
          onClick={() =>
            dispatch(signUp(username, email, password, confirmPassword))
          }
        />
        <p
          onClick={() => dispatch(push('/signin'))}
          className='cursor-pointer underline hover:opacity-70'
        >
          アカウントをすでにお持ちの方はこちら
        </p>
      </div>
    </div>
  );
};

export default SignUp;
