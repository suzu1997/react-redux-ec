import { useEffect, VFC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, makeStyles } from '@material-ui/core';

import { OrderHistoryItem } from '../components/Products/OrderHistoryItem';
import { RootState } from '../reducks/store/store';
import { fetchOrdersHistory } from '../reducks/users/operations';
import { getOrdersHistory } from '../reducks/users/selectors';
import { Order } from '../reducks/users/types';

const useStyles = makeStyles((theme) => ({
  orderList: {
    backgroundColor: '#e6e6fa',
    margin: '0 auto',
    padding: 32,
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: 768,
    },
  },
}));

const OrderHistory: VFC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);

  const orders = getOrdersHistory(selector);

  // マウント時、購入履歴をデータベースより取得
  useEffect(() => {
    dispatch(fetchOrdersHistory());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className='mx-auto my-0 max-w-xl relative py-0 px-4 text-center w-full sm:max-w-5xl'>
      <h2 className='text-blue-500 text-2xl mt-0 mx-auto mb-4'>注文履歴</h2>
      <List className={classes.orderList}>
        {orders.length > 0 &&
          orders.map((order: Order) => (
            <OrderHistoryItem order={order} key={order.id} />
          ))}
      </List>
    </section>
  );
};

export default OrderHistory;
