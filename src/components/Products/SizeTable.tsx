import { useCallback, useEffect, VFC } from 'react';
import {
  IconButton,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { Size } from '../../reducks/products/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducks/store/store';
import {
  getFavoriteProducts,
  getIsSignedIn,
} from '../../reducks/users/selectors';
import { fetchFavoriteProducts } from '../../reducks/users/operations';

type Props = {
  product: any;
  sizes: Array<Size>;
  addProduct: (size: string) => void;
  addFavorite: (size: string) => void;
};

const useStyles = makeStyles({
  iconCell: {
    height: 48,
    width: 48,
    padding: 0,
  },
});

export const SizeTable: VFC<Props> = (props) => {
  const { sizes, addProduct, addFavorite, product } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const isSignedIn = getIsSignedIn(selector);
  const favoriteProducts = getFavoriteProducts(selector);

  /**
   * 商品がお気に入りに登録されているかどうかを判定する
   *
   * @param size 商品のサイズ
   * @returns 商品がお気に入りに登録されているかどうか
   */
  const isFavorite = useCallback(
    (size: string) => {
      return favoriteProducts.some(
        (favorite: any) =>
          favorite.productId === product.id && favorite.size === size
      );
    },
    [favoriteProducts, product]
  );

  // マウント時、お気に入りリストをデータベースより取得
  useEffect(() => {
    if (isSignedIn) {
      dispatch(fetchFavoriteProducts());
    }
  }, [dispatch, favoriteProducts, isSignedIn]);

  return (
    <div>
      <TableContainer>
        <Table>
          <TableBody>
            {sizes.length > 0 &&
              sizes.map((item, i) => (
                <TableRow key={item.size}>
                  <TableCell component='th' scope='row'>
                    {item.size}
                  </TableCell>
                  <TableCell>残り{item.quantity}点</TableCell>
                  <TableCell className={classes.iconCell}>
                    {Number(item.quantity) > 0 ? (
                      <IconButton onClick={() => addProduct(item.size)}>
                        <ShoppingCartIcon />
                      </IconButton>
                    ) : (
                      <div>売切れ</div>
                    )}
                  </TableCell>
                  <TableCell className={classes.iconCell}>
                    {isFavorite(item.size) ? (
                      <IconButton disabled>
                        <FavoriteIcon color='secondary' />
                      </IconButton>
                    ) : (
                      <IconButton onClick={() => addFavorite(item.size)}>
                        <FavoriteBorderIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
