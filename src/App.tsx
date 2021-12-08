import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './reducks/store/store';
import { signInAction } from './reducks/users/actions';

function App() {
  // storeの中身を変更するときに使う
  const dispatch = useDispatch();
  // 現在のstoreの中身がselectorで取得できる
  const selector = useSelector((state: RootState) => state);

  console.log(selector.users);

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
        <button
          onClick={() =>
            // dispatchでActions関数を実行して、storeの中身を変更する
            dispatch(signInAction({ uid: '0001', username: 'chie' }))
          }
        >
          Sign In
        </button>
      </header>
    </div>
  );
}

export default App;
