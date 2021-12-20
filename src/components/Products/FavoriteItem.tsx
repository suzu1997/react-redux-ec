import { VFC } from 'react';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import {
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { PrimaryButton } from '../Uikit/PrimaryButton';
import { removeFavorite } from '../../reducks/users/operations';
import NoImage from '../../assets/img/no_image.png';

type Props = {
  product: any;
};

const useStyles = makeStyles((theme) => ({
  list: {
    height: 'auto',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
    },
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
  buttons: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
  },
}));

export const FavoriteItem: VFC<Props> = (props) => {
  const { product } = props;

  const dispatch = useDispatch();
  const classes = useStyles();

  const image = product.images.length > 0 ? product.images[0].path : NoImage;

  /**
   * お気に入りリストから商品を削除する.
   *
   * @param id - お気に入りリストから削除する対象のID
   * @returns promise
   */
  const removeFromFavorite = (id: string) => {
    dispatch(removeFavorite(id));
  };

  return (
    <div>
      <ListItem className={classes.list}>
        <div className='flex'>
          <ListItemAvatar>
            <img className={classes.image} src={image} alt='商品画像' />
          </ListItemAvatar>
          <div className={classes.text}>
            <ListItemText
              primary={product.name}
              secondary={`サイズ:${product.size}`}
            />
            <ListItemText primary={`¥${product.price.toLocaleString()}`} />
          </div>
        </div>
        <div className={classes.buttons}>
          <span className='mr-4'>
            <PrimaryButton
              label={'商品の詳細を見る'}
              onClick={() =>
                dispatch(push(`/product/detail/${product.productId}`))
              }
            />
          </span>
          <IconButton onClick={() => removeFromFavorite(product.id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      </ListItem>
      <Divider />
    </div>
  );
};
