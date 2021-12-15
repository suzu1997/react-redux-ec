import { VFC } from 'react';
import { makeStyles } from '@material-ui/styles';
import { ProductInCart } from '../../reducks/users/types';
import { Divider, ListItem, ListItemText } from '@material-ui/core';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { IconButton } from '@mui/material';
import DeleteIcon from '@material-ui/icons/Delete';
import NoImage from '../../assets/img/no_image.png';
import { useSelector } from 'react-redux';
import { getUserId } from '../../reducks/users/selectors';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { RootState } from '../../reducks/store/store';

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
  const classes = useStyles();
  const selector = useSelector((state: RootState) => state);
  const uid = getUserId(selector);

  const image =
    props.product.images.length > 0 ? props.product.images[0].path : NoImage;
  const name = props.product.name;
  const price = props.product.price.toLocaleString();
  const size = props.product.size;

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
        <IconButton onClick={() => removeProductFromCart(props.product.cartId)}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
      <Divider />
    </>
  );
};
