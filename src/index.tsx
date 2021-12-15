import ReactDOM from 'react-dom';
// reduxを使うためのインポート
import { Provider } from 'react-redux';
import createStore from './reducks/store/store';
import App from './App';
import './index.css';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
// createStore関数を実行して、Storeを作る
export const store = createStore(history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
