import { useDispatch } from 'react-redux';
// push: 画面遷移をすることができるメソッド
import { push } from 'connected-react-router';
import { signInAction } from '../reducks/users/actions';

const Login = () => {
  const dispatch = useDispatch();

  const login = () => {
    console.log('login');

    dispatch(signInAction({ uid: '0001', username: 'test' }));
    dispatch(push('/'));
  };

  return (
    <div>
      <h2>ログイン</h2>
      <button onClick={login}>ログイン</button>
    </div>
  );
};

export default Login;
