import { useState, VFC } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import NoImage from '../../assets/img/no_image.png';
import { deleteProduct } from '../../reducks/products/operations';

type Props = {
  product: any;
};

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      margin: 8,
      width: 'calc(50% - 16px)',
    },
    [theme.breakpoints.up('sm')]: {
      margin: 16,
      width: 'calc(33.3333% - 32px)',
    },
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px 8px',
    textAlign: 'left',
    '&:lastchild': {
      paddingBottom: 16,
    },
  },
  media: {
    height: '0',
    paddingTop: '100%',
    cursor: 'pointer',
  },
  price: {
    color: 'brown',
    fontSize: 16,
  },
}));

export const ProductCard: VFC<Props> = (props) => {
  const { product } = props;

  const classes = useStyles();
  const dispatch = useDispatch();

  // メニュー開閉する対象の要素
  const [anchorEl, setAnchorEl] = useState<
    Element | ((element: Element) => Element) | null | undefined
  >(null);

  /**
   * メニューを開く.
   * 
   * @param e - event
   */
  const handleClick = (e: any) => {
    setAnchorEl(e.currentTarget);
  };

  /**
   *  メニューを閉じる
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  // 商品画像。商品画像がない場合はNoImageを表示する
  const image =
    product.images.length > 0 ? product.images[0].path : NoImage;

  // 商品の価格
  const price = product.price.toLocaleString();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={image}
        onClick={() => dispatch(push('/product/detail/' + product.id))}
      />
      <CardContent className={classes.content}>
        <div>
          <Typography color='textSecondary' component='p'>
            {product.name}
          </Typography>
          <Typography className={classes.price} component='p'>
            ¥{price}
          </Typography>
        </div>
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => dispatch(push('/product/edit/' + product.id))}
          >
            編集する
          </MenuItem>
          <MenuItem onClick={() => dispatch(deleteProduct(product.id))}>
            削除する
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
};
