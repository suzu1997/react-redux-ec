import { Badge } from '@material-ui/core';
import { IconButton } from '@mui/material';
import { useEffect, VFC } from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MenuIcon from '@material-ui/icons/Menu';

import { getProductsInCart, getUserId } from '../../reducks/users/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducks/store/store';
import { db } from '../../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { ProductInCart } from '../../reducks/users/types';
import { fetchProductsInCart } from '../../reducks/users/operations';
import { push } from 'connected-react-router';

type Props = {
  handleDrawerToggle: (e: any) => void;
};

export const HeaderMenus: VFC<Props> = (props) => {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const uid = getUserId(selector);
  let productsInCart = getProductsInCart(selector);

  // firebaseのリスナーを設定
  useEffect(() => {
    const ref = collection(db, 'users', uid, 'cart');
    // onSnapshotでリスナーを設定
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        // change.doc.data()にデータが入る
        const product = change.doc.data();
        // change.typeでどんな変化があったのか判別
        const changeType = change.type;

        console.log({ change });

        // change.typeに応じて配列操作
        if (changeType === 'added') {
          productsInCart.push(product);
        }
        if (changeType === 'modified') {
          const index = productsInCart.findIndex(
            (product: ProductInCart) => product.cartId === change.doc.id
          );
          productsInCart[index] = product;
        }
        if (changeType === 'removed') {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          productsInCart = productsInCart.filter(
            (product: ProductInCart) => product.cartId !== change.doc.id
          );
        }
      });

      dispatch(fetchProductsInCart(productsInCart));
    });
    // リスナーの解除
    return () => unsubscribe();
  }, []);

  return (
    <>
      <IconButton onClick={() => dispatch(push('/cart'))}>
        <Badge badgeContent={productsInCart.length} color='secondary'>
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <IconButton>
        <FavoriteBorderIcon />
      </IconButton>
      <IconButton onClick={(e) => props.handleDrawerToggle(e)}>
        <MenuIcon />
      </IconButton>
    </>
  );
};
