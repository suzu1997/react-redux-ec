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
    <section className='mx-auto my-0 max-w-xl relative py-0 px-4 text-center w-full sm:max-w-5xl'>
      <h2 className='text-blue-500 text-2xl mt-0 mx-auto mb-4'>
        ショッピングカート
      </h2>
      <List className={classes.root}>
        {productsInCart.length > 0 ? (
          productsInCart.map((product: ProductInCart) => (
            <CartListItem product={product} key={product.cartId} />
          ))
        ) : (
          <div>カート内に商品が入っていません</div>
        )}
      </List>
      <div className='h-8 sm:h-12' />
      <div className='items-center flex flex-col'>
        {productsInCart.length > 0 && (
          <PrimaryButton label={'レジへ進む'} onClick={goToOrder} />
        )}
        <div className='h-3 sm:h-4' />
        <GreyButton label={'ショッピングを続ける'} onClick={backToHome} />
      </div>
    </section>
  );
};

export default CartList;
