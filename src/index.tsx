import ReactDOM from 'react-dom';
// reduxを使うためのインポート
import { Provider } from 'react-redux';
import createStore from './reducks/store/store';
import App from './App';
import './index.css';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { Toaster } from 'react-hot-toast';

const history = createBrowserHistory();
// createStore関数を実行して、Storeを作る
export const store = createStore(history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
      <Toaster
        position='top-center'
        toastOptions={{
          duration: 5000,
        }}
      />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
