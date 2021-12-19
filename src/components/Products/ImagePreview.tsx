import { VFC } from 'react';
import { Image } from '../../reducks/products/types';

type Props = Image & {
  delete: (id: string) => Promise<void> | undefined;
};

export const ImagePreview: VFC<Props> = (props) => {
  const { id, path, delete: deleteImage } = props;

  return (
    <img
      src={path}
      alt='プレビュー画像'
      onClick={() => deleteImage(id)}
      className='w-32 h-32 object-cover mx-auto cursor-pointer'
    />
  );
};
