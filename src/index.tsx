import ReactDOM from 'react-dom';
// reduxを使うためのインポート
import { Provider } from 'react-redux';
import createStore from './reducks/store/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
