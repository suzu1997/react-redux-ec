import { List, makeStyles } from '@material-ui/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

const OrderHistory = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);

  const orders = getOrdersHistory(selector);

  useEffect(() => {
    dispatch(fetchOrdersHistory());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(orders);

  return (
    <section className='c-section-wrapin'>
      <h2 className='u-text__headline'>注文履歴</h2>
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
