import { useCallback, useEffect, useState, VFC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import HTMLReactParser from 'html-react-parser';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { db, FirebaseTimestamp } from '../firebase';
import { ImageSwiper } from '../components/Products/ImageSwiper';
import { SizeTable } from '../components/Products/SizeTable';
import {
  addProductToCart,
  addProductToFavorite,
} from '../reducks/users/operations';
import { RootState } from '../reducks/store/store';
import { getIsSignedIn } from '../reducks/users/selectors';
import { Modal } from '../components/Uikit/modal';

const useStyles = makeStyles((theme) => ({
  slideBox: {
    // スマートフォンサイズ
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 24px auto',
      // iphoneSEの幅に合わせて、スライドボックスのサイズを調整
      height: 320,
      width: 320,
    },
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      height: 400,
      width: 400,
    },
  },
  detail: {
    textAlign: 'left',
    // スマートフォンサイズ
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 16px auto',
      height: 'auto',
      width: 320,
    },
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      height: 'auto',
      width: 400,
    },
  },
  price: {
    fontSize: 36,
  },
}));

/**
 * テキストをHTMLに変換.
 *
 * @remarks
 * 改行はbrタグに変換する。
 *
 * @param text - HTMLに変換するテキスト
 * @returns textが空文字列の場合は空文字列。そうでなければHTMLに変換した文字列。
 */
const returnCodeToBr = (text: string) => {
  if (text === '') {
    return text;
  } else {
    return HTMLReactParser(text.replace(/\r?\n/g, '<br />'));
  }
};

const ProductDetail: VFC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);

  const isSignedIn = getIsSignedIn(selector);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalText, setModalText] = useState<string>('');

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  // 表示する商品
  const [product, setProduct] = useState<any>(null);

  // マウント時、IDで商品情報を取得
  useEffect(() => {
    let id = window.location.pathname.split('/product/detail')[1];
    if (id !== '') {
      id = id.split('/')[1];
    }
    // URLから商品のIDを取得
    getDoc(doc(db, 'products', id)).then((snapshot) => {
      const data = snapshot.data();
      setProduct(data);
    });
  }, []);

  /**
   * 商品をカートに追加する.
   *
   * @param selectedSize - カートに追加する商品のサイズ
   */
  const addProduct = useCallback(
    (selectedSize) => {
      if (!isSignedIn) {
        setModalText('商品をカートに入れるには、ログインをしてください。');
        openModal();
        return;
      }

      const timestamp = FirebaseTimestamp.now();
      dispatch(
        addProductToCart({
          added_at: timestamp,
          description: product.description,
          gender: product.gender,
          images: product.images,
          name: product.name,
          price: product.price,
          productId: product.id,
          quantity: 1,
          size: selectedSize,
        })
      );
    },
    [product, dispatch, isSignedIn, openModal]
  );

  /**
   * 商品をお気に入りに追加する.
   *
   * @param selectedSize - お気に入りに追加する商品のサイズ
   */
  const addFavorite = useCallback(
    (selectedSize) => {
      if (!isSignedIn) {
        setModalText(
          'お気に入り機能をご利用になるには、ログインをしてください。'
        );
        openModal();
        return;
      }
      const timestamp = FirebaseTimestamp.now();
      dispatch(
        addProductToFavorite({
          added_at: timestamp,
          images: product.images,
          name: product.name,
          price: product.price,
          productId: product.id,
          size: selectedSize,
        })
      );
    },
    [product, dispatch, isSignedIn, openModal]
  );

  return (
    <section className='mx-auto my-0 max-w-xl relative py-0 px-4 text-center w-full sm:max-w-5xl'>
      {product && (
        <div className='flex flex-row flex-wrap'>
          <div className={classes.slideBox}>
            <ImageSwiper images={product.images} />
          </div>
          <div className={classes.detail}>
            <h2 className='text-blue-500 text-2xl mt-0 mx-auto mb-4'>
              {product.name}
            </h2>
            <p className={classes.price}>¥{product.price.toLocaleString()}</p>
            <div className='h-5 sm:h-8'></div>
            <SizeTable
              product={product}
              sizes={product.sizes}
              addProduct={addProduct}
              addFavorite={addFavorite}
            />
            <div className='h-5 sm:h-8'></div>
            <p>{returnCodeToBr(product.description)}</p>
          </div>
        </div>
      )}
      <Modal isOpen={isOpen} closeModal={closeModal} text={modalText} />
    </section>
  );
};

export default ProductDetail;
