import { compose } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import * as Actions from '../reducks/users/operations';
import type { RootState } from '../reducks/store/store';
import Login from '../templates/Login';

const mapStateToProps = (state: RootState) => {
  return {
    users: state.users,
  };
};
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => {
  return {
    actions: {
      signIn() {
        // storeからDispatchする関数
        // Actionsやoperations
        dispatch(Actions.signIn());
      },
    },
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(Login);
