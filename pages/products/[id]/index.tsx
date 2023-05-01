import React, { useEffect } from 'react'
import Carousel from 'nuka-carousel'
import Image from 'next/image'
import CustomEditor from '@components/Editor'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'

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

export default function Edit() {
  const router = useRouter()
  const { id: productId } = router.query
  const [editorState, setEditorState] = useState<EditorState | undefined>(
    undefined
  )

  useEffect(() => {
    if (productId != null) {
      fetch(`/api/get-product?id=${productId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.items.contents) {
            setEditorState(
              EditorState.createWithContent(
                convertFromRaw(JSON.parse(data.items.contents))
              )
            )
          } else {
            setEditorState(EditorState.createEmpty())
          }
        })
    }
  }, [productId])

  return (
    <>
      <Carousel animation="fade" autoplay speed={2000} wrapAround>
        {images.map((image) => (
          <Image
            key={image.original}
            src={image.original}
            width={1000}
            height={1000}
            alt="image"
          ></Image>
        ))}
      </Carousel>
      {editorState != null && (
        <CustomEditor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          readOnly
        />
      )}
    </>
  )
}
