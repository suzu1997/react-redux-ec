import { VFC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducks/store/store';
import { signOut } from '../reducks/users/operations';
import { getUserId, getUsername } from '../reducks/users/selectors';

const Home: VFC = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const uid = getUserId(selector);
  const username = getUsername(selector);

  return (
    <div>
      <h1>Home</h1>
      <p>ユーザーID:{uid}</p>
      <p>ユーザー名:{username}</p>
      <button onClick={() => dispatch(signOut())}>SIGN OUT</button>
    </div>
  );
};

export default Home;
