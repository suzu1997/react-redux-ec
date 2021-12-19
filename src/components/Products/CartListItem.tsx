import { VFC } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Divider, ListItem, ListItemText } from '@material-ui/core';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { IconButton } from '@mui/material';
import DeleteIcon from '@material-ui/icons/Delete';

import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { getUserId } from '../../reducks/users/selectors';
import { RootState } from '../../reducks/store/store';
import { ProductInCart } from '../../reducks/users/types';
import NoImage from '../../assets/img/no_image.png';

type Props = {
  product: ProductInCart;
};

const useStyles = makeStyles({
  list: {
    height: 128,
  },
  image: {
    objectFit: 'cover',
    margin: 16,
    height: 96,
    width: 96,
  },
  text: {
    width: '100%',
  },
});

export const CartListItem: VFC<Props> = (props) => {
  const { product } = props;

  const classes = useStyles();
  const selector = useSelector((state: RootState) => state);
  const uid = getUserId(selector);

  // 商品画像
  const image = product.images.length > 0 ? product.images[0].path : NoImage;
  // 商品名
  const name = product.name;
  // 商品価格
  const price = product.price.toLocaleString();
  // 商品のサイズ
  const size = product.size;

  /**
   * カートから商品を削除する.
   *
   * @param id - 商品ID
   * @returns promise
   */
  const removeProductFromCart = (id: string) => {
    return deleteDoc(doc(db, 'users', uid, 'cart', id));
  };

  return (
    <>
      <ListItem className={classes.list}>
        <ListItemAvatar>
          <img className={classes.image} src={image} alt='商品画像' />
        </ListItemAvatar>
        <div className={classes.text}>
          <ListItemText primary={name} secondary={`サイズ:${size}`} />
          <ListItemText primary={`¥${price}`} />
        </div>
        <IconButton onClick={() => removeProductFromCart(product.cartId)}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
      <Divider />
    </>
  );
};
