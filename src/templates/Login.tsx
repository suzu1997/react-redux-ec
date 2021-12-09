import { useDispatch, useSelector } from 'react-redux';
// push: 画面遷移をすることができるメソッド
import { push } from 'connected-react-router';
import { RootState } from '../reducks/store/store';

const Login = () => {
  const dispatch = useDispatch();
  const selector = useSelector<RootState, RootState>(
    (state: RootState) => state
  );

  console.log(selector.router);

  return (
    <div>
      <h2>ログイン</h2>
      <button onClick={() => dispatch(push('/'))}>ログイン</button>
    </div>
  );
};

export default Login;
