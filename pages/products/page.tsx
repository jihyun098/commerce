import { products, categories } from '@prisma/client'
import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { Pagination } from '@mantine/core'
import { TAKE, CATEGORY_MAP } from 'constants/products'
import { SegmentedControl } from '@mantine/core'
export default function Products() {
  const [activePage, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [categories, setCategories] = useState<categories[]>([])
  const [selectedCategory, setCategory] = useState<string | string>('-1')
  const [products, setProducts] = useState<products[]>([])

  useEffect(() => {
    fetch(`/api/get-categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data.items))
  }, [])

  useEffect(() => {
    fetch(`/api/get-products-count?category=${selectedCategory}`)
      .then((res) => res.json())
      .then((data) => setTotal(Math.ceil(data.items / 9)))
  }, [selectedCategory])

  useEffect(() => {
    const skip = TAKE * (activePage - 1)
    fetch(
      `/api/get-products?skip=${skip}&take=${TAKE}&category=${selectedCategory}`
    )
      .then((res) => res.json())
      .then((data) => setProducts(data.items))
  }, [activePage, selectedCategory])

  return (
    <div className="px-36 mt-36 mb-36">
      {categories && (
        <div className="mb-4">
          <SegmentedControl
            value={selectedCategory}
            onChange={setCategory}
            data={[
              { label: 'All', value: '-1' },
              ...categories.map((category) => ({
                label: category.name,
                value: String(category.id),
              })),
            ]}
            color="dark"
          />
        </div>
      )}

      {products && (
        <div className="grid grid-cols-3 gap-5">
          {products.map((item) => (
            <div key={item.id} style={{ maxWidth: 300 }}>
              <Image
                className="rounded"
                alt={item.name}
                src={item.image_url ?? ''}
                width={300}
                height={300}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
              ></Image>
              <div className="flex">
                <span>{item.name}</span>
                <span className="ml-auto">
                  {item.price.toLocaleString('ko-KR')} 원
                </span>
              </div>
              <span className="text-zinc-400">
                {CATEGORY_MAP[item.category_id - 1]}
              </span>
            </div>
          ))}
        </div>
      )}
      <div className="w-full flex mt-5">
        <Pagination
          className="m-auto"
          value={activePage}
          onChange={setPage}
          total={total}
        ></Pagination>
      </div>
    </div>
  )
}
