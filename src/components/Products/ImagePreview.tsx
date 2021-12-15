import { VFC } from 'react';
import { Image } from '../../reducks/products/types';

type Props = Image & {
  delete: (id: string) => Promise<void> | undefined;
};

export const ImagePreview: VFC<Props> = (props) => {
  return (
    // <div className='w-full'>
    <img
      src={props.path}
      alt='プレビュー画像'
      onClick={() => props.delete(props.id)}
      className='w-5/12 h-auto mx-auto cursor-pointer'
    />
    // </div>
  );
};
