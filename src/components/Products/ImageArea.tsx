import { useCallback, VFC } from 'react';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from '@firebase/storage';
import { IconButton } from '@material-ui/core';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { makeStyles } from '@material-ui/core';

import { storage } from '../../firebase';
import { Image } from '../../reducks/products/types';
import { ImagePreview } from './ImagePreview';

type Props = {
  images: Array<Image>;
  setImages: (images: any) => void;
};

const useStyles = makeStyles({
  icon: {
    height: 48,
    width: 48,
  },
});

// 画像用コンポーネント
export const ImageArea: VFC<Props> = (props) => {
  const { images, setImages } = props;

  const classes = useStyles();

  /**
   * 画像を削除する.
   *
   * @param id - 削除する画像のID
   * @returns promiseもしくはundefined
   */
  const deleteImage = useCallback(
    (id: string) => {
      const ret = window.confirm('この画像を削除しますか？');

      if (!ret) {
        // キャンセルを押したとき
        return;
      } else {
        // OKを押したとき
        // 削除しない画像のみのリストを作成する
        const newImages = images.filter((image) => image.id !== id);
        setImages(newImages);
        // storageから画像を削除
        const deleteRef = ref(storage, 'images/' + id);
        return deleteObject(deleteRef);
      }
    },
    [images, setImages]
  );

  /**
   * Cloud Storageに画像をアップロードする.
   *
   * @param e - event
   */
  const uploadImage = useCallback(
    (e) => {
      // inputに入れた画像を取得
      const file = e.target.files;
      // Cloud Storageに入れるには、Blobオブジェクトにする
      // typeをimage/jpegにする
      let blob = new Blob(file, { type: 'image/jpeg' });

      // ランダムな画像名を生成
      const S =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      // 桁数
      const N = 16;
      // 16桁の文字列をランダム生成
      const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join('');

      // Cloud Storageに画像をアップ
      const uploadRef = ref(storage, 'images/' + fileName);
      const uploadTask = uploadBytes(uploadRef, blob);
      uploadTask.then((snapshot) => {
        // アップロードの処理が完了したら、画像のURLを取得
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          const newImage = { id: fileName, path: downloadURL };
          // useStateのset関数。 更新前のstateを使える
          setImages((prevState: Array<Image>) => [...prevState, newImage]);
        });
      });
    },
    [setImages]
  );

  return (
    <div>
      <div className='flex flex-wrap gap-2 text-center'>
        {images.length > 0 &&
          images.map((image) => (
            <ImagePreview
              delete={deleteImage}
              id={image.id}
              path={image.path}
              key={image.id}
            />
          ))}
      </div>
      <div className='text-right'>
        <span>商品画像を登録する</span>
        <IconButton className={classes.icon}>
          <label>
            <AddPhotoAlternateIcon />
            <input
              className='hidden'
              type='file'
              id='image'
              onChange={(e) => {
                uploadImage(e);
              }}
            />
          </label>
        </IconButton>
      </div>
    </div>
  );
};
