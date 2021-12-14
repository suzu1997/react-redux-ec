import { Divider, List, makeStyles } from '@material-ui/core';
import { useMemo, VFC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CartListItem } from '../components/Products/CartListItem';
import { TextDetail } from '../components/Uikit/TextDetail';
import { RootState } from '../reducks/store/store';
import { getProductsInCart } from '../reducks/users/selectors';
import type { ProductInCart } from '../reducks/users/types';

const useStyles = makeStyles((theme) => ({
  detailBox: {
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      // スマートフォンサイズ iphoneSEのサイズ
      width: 320,
    },
    [theme.breakpoints.up('sm')]: {
      width: 512,
    },
  },
  orderBox: {
    border: '1px solid #ddd',
    borderRadius: 4,
    boxShadow: '0 4px 1px 1px #ddd',
    height: 256,
    margin: '24px auto 16px auto',
    padding: 16,
    width: 288,
  },
}));

const OrderConfirm: VFC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);

  const productsInCart = getProductsInCart(selector);

  // 小計を計算
  // useMemoでメモ化
  const subtotal = useMemo(() => {
    return productsInCart.reduce(
      (sum: number, product: ProductInCart) => (sum += product.price),
      0
    );
  }, [productsInCart]);

  // 送料を計算
  // 10000円以上の場合は送料0円 それ以下は送料210円
  const shippingFee = subtotal >= 10000 ? 0 : 210;

  const TAX_RATE = 0.1;
  // 消費税を計算
  const tax = Math.floor(subtotal * TAX_RATE);

  // 合計金額を計算
  const total = subtotal + shippingFee + tax;

  return (
    <section className='c-section-wrapin'>
      <h2 className='u-text__headline'>注文の確認</h2>
      <div className='p-grid__row'>
        <div className={classes.detailBox}>
          <List>
            {productsInCart.length > 0 &&
              productsInCart.map((product: ProductInCart) => (
                <CartListItem key={product.cartId} product={product} />
              ))}
          </List>
        </div>
        <div className={classes.orderBox}>
          <TextDetail
            label={'商品合計'}
            value={`¥${subtotal.toLocaleString()}`}
          />
          <TextDetail label={'消費税'} value={`¥${tax.toLocaleString()}`} />
          <TextDetail
            label={'送料'}
            value={`¥${shippingFee.toLocaleString()}`}
          />
          <Divider />
          <TextDetail
            label={'合計(税込)'}
            value={`¥${total.toLocaleString()}`}
          />
        </div>
      </div>
    </section>
  );
};
export default OrderConfirm;
