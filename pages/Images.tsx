import ImageGallery from 'react-image-gallery'
import React from 'react'
import Carousel from 'nuka-carousel'
import Image from 'next/image'
import Head from 'next/head'
const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1011/1000/600/',
    thumbnail: 'https://picsum.photos/id/1011/250/150/',
  },
]

const images2 = [
  {
    original: 'https://picsum.photos/id/1010/1000/600/',
    thumbnail: 'https://picsum.photos/id/1010/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1013/1000/600/',
    thumbnail: 'https://picsum.photos/id/1013/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1001/1000/600/',
    thumbnail: 'https://picsum.photos/id/1001/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1012/1000/600/',
    thumbnail: 'https://picsum.photos/id/1012/250/150/',
  },
]

export default function Images() {
  return (
    <>
      <ImageGallery items={images}></ImageGallery>
      <Carousel animation="fade" autoplay speed={2000}>
        {images2.map((image) => (
          <Image
            key={image.original}
            src={image.original}
            width={1000}
            height={1000}
            alt="image"
          ></Image>
        ))}
      </Carousel>
    </>
  )
}
