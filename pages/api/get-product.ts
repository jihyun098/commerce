import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'
import { Result } from 'postcss'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getProduct(id: number) {
  try {
    const response = await prisma.products.findUnique({
      where: {
        id: id,
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
  const { id } = req.query
  if (id == null) {
    res.status(400).json({ message: '해당 상품이 없습니다.' })
    return
  }
  try {
    const product = await getProduct(Number(id))
    console.log(product)
    res.status(200).json({ items: product, message: `Success Product` })
  } catch (error) {
    res.status(400).json({ message: `Failed Product` })
  }
}
