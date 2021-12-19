import { VFC } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import { Divider } from '@mui/material';

import { OrderProduct } from '../../reducks/products/types';
import { PrimaryButton } from '../Uikit/PrimaryButton';

type Props = {
  products: Array<OrderProduct>;
};

const useStyles = makeStyles((theme) => ({
  list: {
    [theme.breakpoints.up('sm')]: {
      height: 'auto',
      backgroundColor: '#fff',
      display: 'flex',
      justifyContent: 'space-between',
    },
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
    },
  },
  image: {
    objectFit: 'cover',
    margin: '0px 16px 8px 0',
    height: 96,
    width: 96,
  },
  text: {
    width: '100%',
  },
}));

export const OrderedProducts: VFC<Props> = (props) => {
  const { products } = props;

  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <List>
      {products.map((product, index) => (
        <div key={index}>
          <ListItem className={classes.list}>
            <div className='flex'>
              <ListItemAvatar>
                <img
                  className={classes.image}
                  src={product.images[0].path}
                  alt='商品画像'
                />
              </ListItemAvatar>
              <div className={classes.text}>
                <ListItemText
                  primary={product.name}
                  secondary={`サイズ:${product.size}`}
                />
                <ListItemText primary={`¥${product.price.toLocaleString()}`} />
              </div>
            </div>
            <PrimaryButton
              label={'商品の詳細を見る'}
              onClick={() => dispatch(push(`/product/detail/${product.id}`))}
            />
          </ListItem>
          <Divider />
        </div>
      ))}
    </List>
  );
};
