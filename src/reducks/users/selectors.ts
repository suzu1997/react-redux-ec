import { createSelector } from 'reselect';
import { RootState } from '../store/store';

const usersSelector = (state: RootState) => state.users;

export const getFavoriteProducts = createSelector(
  [usersSelector],
  (state) => state.favorite
)

export const getIsSignedIn = createSelector(
  [usersSelector],
  (state) => state.isSignedIn
)
export const getOrdersHistory = createSelector(
  [usersSelector],
  (state) => state.orders
)

export const getProductsInCart = createSelector(
  [usersSelector],
  (state) => state.cart
)

export const getUserInfo = createSelector(
  [usersSelector],
  (state) => state
)

export const getUserId = createSelector(
  [usersSelector],
  (state) => state.uid
)

export const getUsername = createSelector(
  [usersSelector],
  (state) => state.username
)

export const getRole = createSelector(
  [usersSelector],
  (state) => state.role
) 
