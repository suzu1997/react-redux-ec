import { push } from 'connected-react-router';
import type { Dispatch } from 'redux';

import { signInAction } from './actions';
import { RootState } from '../store/store';

export const signIn = () => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const state = getState();
    const isSignedIn = state.users.isSignedIn;

    if (!isSignedIn) {
      const URL = 'https://api.github.com/users/suzu1997';
      const response = await fetch(URL).then(res => res.json());
      const username = response.login;
      const uid = response.id;

      dispatch(signInAction({
        uid: uid,
        username: username
      }))
      dispatch(push('/'));
    }
  }
}