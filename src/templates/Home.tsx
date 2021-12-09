import { useSelector } from 'react-redux';
import { RootState } from '../reducks/store/store';
import { getUserId, getUsername } from '../reducks/users/selectors';

const Home = () => {
  const selector = useSelector((state: RootState) => state);
  const uid = getUserId(selector);
  const username = getUsername(selector);

  console.log(uid);
  
  return (
    <div>
      <h1>Home</h1>
      <p>{uid}</p>
      <p>{username}</p>
    </div>
  );
};

export default Home;
