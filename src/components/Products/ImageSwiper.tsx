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
    spaceBetween: 0,
  });

  return (
    <Swiper {...params}>
      {props.images.length === 0 ? (
        <div>
          <img
            src={NoImage}
            alt='イメージなし'
            className='w-80 h-80 sm:w-96 sm:h-96 object-cover mx-auto'
          />
        </div>
      ) : (
        props.images.map((image: Image) => (
          <div key={image.id}>
            <img
              src={image.path}
              alt={'商品画像'}
              className='w-80 h-80 sm:w-96 sm:h-96 object-cover mx-auto'
            />
          </div>
        ))
      )}
    </Swiper>
  );
};
