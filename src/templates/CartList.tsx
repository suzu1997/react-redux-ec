import { List, makeStyles } from '@material-ui/core';
import { push } from 'connected-react-router';
import { useCallback, VFC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CartListItem } from '../components/Products/CartListItem';
import { PrimaryButton } from '../components/Uikit/PrimaryButton';
import { GreyButton } from '../components/Uikit/GreyButton';
import { RootState } from '../reducks/store/store';
import { getProductsInCart } from '../reducks/users/selectors';
import { ProductInCart } from '../reducks/users/types';

const useStyles = makeStyles({
  root: {
    margin: '0 auto',
    maxWidth: 512,
    width: '100%',
  },
});

const CartList: VFC = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);

  const productsInCart = getProductsInCart(selector);

  const goToOrder = useCallback(() => {
    dispatch(push('/order/confirm'));
  }, [dispatch]);

  const backToHome = useCallback(() => {
    dispatch(push('/'));
  }, [dispatch]);

  return (
    <section className='c-section-wrapin'>
      <h2 className='u-text__headline'>ショッピングカート</h2>
      <List className={classes.root}>
        {productsInCart.length > 0 &&
          productsInCart.map((product: ProductInCart) => (
            <CartListItem product={product} key={product.cartId} />
          ))}
      </List>
      <div className='module-spacer--medium' />
      <div className='p-grid__column'>
        <PrimaryButton label={'レジへ進む'} onClick={goToOrder} />
        <div className='module-spacer--extra-extra-small' />
        <GreyButton label={'ショッピングを続ける'} onClick={backToHome} />
      </div>
    </section>
  );
};

export default CartList;
