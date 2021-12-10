import { ReactNode, useEffect, VFC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './reducks/store/store';
import { ListenAuthState } from './reducks/users/operations';
import { getIsSignedIn } from './reducks/users/selectors';

type Props = {
  children: ReactNode;
};

export const Auth: VFC<Props> = (props) => {
  const { children } = props;

  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const isSignedIn = getIsSignedIn(selector);

  useEffect(() => {
    // サインインしていなければ、ListenAuthState関数を呼んでリッスン
    if (!isSignedIn) {
      dispatch(ListenAuthState());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

   // ログインしていなければ、空の画面を表示
  if (!isSignedIn) {
    return <></>;
  }

  // ログインしていれば、childrenとして渡ってきた画面を表示
  return <>{children}</>;
};
