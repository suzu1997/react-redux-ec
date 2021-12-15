import { VFC } from 'react';
import { format } from 'date-fns';

import { Order } from '../../reducks/users/types';
import { TextDetail } from '../Uikit/TextDetail';
import { OrderedProducts } from './OrderedProducts';

type Props = {
  order: Order;
};

// Date型の日時を日付と時刻の文字列に変換する
const dateTimeToString = (date: Date): string => {
  return format(date, 'yyyy-MM-dd HH:mm:ss');
};

// Date型の日時を日付のみ文字列に変換する
const dateToString = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

export const OrderHistoryItem: VFC<Props> = (props) => {
  const order = props.order;
  const orderedDateTime = dateTimeToString(order.updated_at.toDate());
  const ShippingDate = dateToString(order.shipping_date.toDate());
  const price = `¥${order.amount.toLocaleString()}`;

  return (
    <div>
      <div className='module-spacer--small' />
      <TextDetail label={'注文ID'} value={order.id} />
      <TextDetail label={'注文日時'} value={orderedDateTime} />
      <TextDetail label={'発送予定日'} value={ShippingDate} />
      <TextDetail label={'注文金額'} value={price} />
      <div className='module-spacer--extra-extra-small' />
      {order.products.length > 0 && (
        <OrderedProducts products={order.products} />
      )}
    </div>
  );
};
