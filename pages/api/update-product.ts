import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'
import { Result } from 'postcss'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function updateProduct(id: number, contents: String) {
  try {
    const response = await prisma.products.update({
      where: {
        id: id,
      },
      data: {
        contents: contents as string,
      },
    })
    console.log(response)
    return response
  } catch (error) {
    console.error(error)
  }
}
type Data = {
  items?: any
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id, contents } = JSON.parse(req.body)
  if (id == null || contents == null) {
    res.status(400).json({ message: '해당 상품이 없습니다.' })
    return
  }
  try {
    const product = await updateProduct(Number(id), contents)
    console.log(product)
    res.status(200).json({ items: product, message: `Success Product` })
  } catch (error) {
    res.status(400).json({ message: `Failed Product` })
  }
}
