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
    <div className='c-section-container'>
      <h2 className='u-text__headline u-text-center'>パスワードのリセット</h2>
      <div className='module-spacer--medium' />

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
      <div className='module-spacer--medium' />
      <div className='center'>
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
