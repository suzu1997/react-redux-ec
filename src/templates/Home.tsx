import { useSelector } from 'react-redux';
import { RootState } from '../reducks/store/store';
import { getUserId, getUsername } from '../reducks/users/selectors';

const Home = () => {
  const selector = useSelector((state: RootState) => state);
  const uid = getUserId(selector);
  const username = getUsername(selector);

  return (
    <div>
      <h1>Home</h1>
      <p>ユーザーID:{uid}</p>
      <p>ユーザー名:{username}</p>
    </div>
  );
};

export default Home;
