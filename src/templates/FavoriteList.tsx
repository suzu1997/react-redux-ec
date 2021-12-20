import { List, makeStyles } from '@material-ui/core';
import { useEffect, VFC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FavoriteItem } from '../components/Products/FavoriteItem';
import { RootState } from '../reducks/store/store';
import { fetchFavoriteProducts } from '../reducks/users/operations';
import { getFavoriteProducts } from '../reducks/users/selectors';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 auto',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: 768,
    },
  },
}));

const FavoriteList: VFC = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  // お気に入りリスト
  const favorites = getFavoriteProducts(selector);

  // マウント時、お気に入りリストをデータベースより取得
  useEffect(() => {
    dispatch(fetchFavoriteProducts());
  }, [dispatch]);

  return (
    <section className='mx-auto my-0 max-w-xl relative py-0 px-4 text-center w-full sm:max-w-5xl'>
      <h2 className='text-blue-500 text-2xl mt-0 mx-auto mb-4'>
        お気に入りリスト
      </h2>
      <List className={classes.root}>
        {favorites.length > 0 ? (
          favorites.map((product: any) => (
            <FavoriteItem product={product} key={product.id} />
          ))
        ) : (
          <p className='text-gray-500 text-xl'>
            お気に入りリストに入れている商品はありません。
          </p>
        )}
      </List>
    </section>
  );
};

export default FavoriteList;
