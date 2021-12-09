import { useDispatch } from 'react-redux';
import { signIn } from '../reducks/users/operations';

const Login = (props: any) => {
  // console.log(props.users);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>ログイン</h2>
      <button onClick={() => dispatch(signIn())}>ログイン</button>
    </div>
  );
};

export default Login;
