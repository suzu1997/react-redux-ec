import { createSelector } from 'reselect';
import { RootState } from '../store/store';

const usersSelector = (state: RootState) => state.users;

export const getUserId = createSelector(
  [usersSelector],
  (state) => state.uid
)

export const getUsername = createSelector(
  [usersSelector],
  (state) => state.username
)
