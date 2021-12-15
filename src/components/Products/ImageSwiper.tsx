import { useState, VFC } from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import type { Image } from '../../reducks/products/types';
import NoImage from '../../assets/img/no_image.png';

type Props = {
  images: Array<Image>;
};

export const ImageSwiper: VFC<Props> = (props) => {
  const [params] = useState({
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    loop: true,
  });

  return (
    <Swiper {...params}>
      {props.images.length === 0 ? (
        <div className='relative overflow-hidden w-full before:block before:pt-full'>
          <img
            src={NoImage}
            alt='イメージなし'
            className='absolute object-cover object-center top-0 left-0 w-full h-auto'
          />
        </div>
      ) : (
        props.images.map((image: Image) => (
          <div
            key={image.id}
            className='relative overflow-hidden w-full before:block before:pt-full'
          >
            <img
              src={image.path}
              alt={'商品画像'}
              className='absolute object-cover object-center top-0 left-0 w-full h-auto'
            />
          </div>
        ))
      )}
    </Swiper>
  );
};
