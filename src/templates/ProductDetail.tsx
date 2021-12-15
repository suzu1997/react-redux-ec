import { doc, getDoc } from 'firebase/firestore';
import { useCallback, useEffect, useState, VFC } from 'react';
import { db, FirebaseTimestamp } from '../firebase';
import makeStyles from '@material-ui/core/styles/makeStyles';
import HTMLReactParser from 'html-react-parser';
import { ImageSwiper } from '../components/Products/ImageSwiper';
import { SizeTable } from '../components/Products/SizeTable';
import { useDispatch } from 'react-redux';
import { addProductToCart } from '../reducks/users/operations';

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

// テキストをHTMLに変換。改行はbrタグに変換
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

  let id = window.location.pathname.split('/product')[1];
  if (id !== '') {
    id = id.split('/')[1];
  }

  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    getDoc(doc(db, 'products', id)).then((snapshot) => {
      const data = snapshot.data();
      setProduct(data);
    });
  }, [id]);

  const addProduct = useCallback((selectedSize) => {
    const timestamp = FirebaseTimestamp.now();
    dispatch(addProductToCart({
      added_at: timestamp,
      description: product.description,
      gender: product.gender,
      images: product.images,
      name: product.name,
      price: product.price,
      productId: product.id,
      quantity: 1,
      size: selectedSize,
    }))
  }, [product, dispatch]);

  return (
    <section className='mx-auto my-0 max-w-xl relative py-0 px-4 text-center w-full sm:max-w-5xl'>
      {product && (
        <div className='flex flex-row flex-wrap'>
          <div className={classes.slideBox}>
            <ImageSwiper images={product.images} />
          </div>
          <div className={classes.detail}>
            <h2 className='text-blue-500 text-2xl mt-0 mx-auto mb-4'>{product.name}</h2>
            <p className={classes.price}>¥{product.price.toLocaleString()}</p>
            <div className='h-5 sm:h-8'></div>
            <SizeTable sizes={product.sizes} addProduct={addProduct} />
            <div className='h-5 sm:h-8'></div>
            <p>{returnCodeToBr(product.description)}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetail;
