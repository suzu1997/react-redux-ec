import { VFC } from 'react'
import { Image } from '../../reducks/products/types'

export const ImagePreview: VFC<Image> = (props) => {
  return (
    <div className='p-media__thumb'>
      <img src={props.path} alt="プレビュー画像" />
    </div>
  )
} 