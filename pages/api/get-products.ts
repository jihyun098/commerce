import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'
import { Result } from 'postcss'
import { PrismaClient } from '@prisma/client'
import { getOrderBy } from 'constants/products'

const prisma = new PrismaClient()

async function getProducts({
  skip,
  take,
  category,
  orderBy,
  contains,
}: {
  skip: number
  take: number
  category: number
  orderBy: string
  contains: string
}) {
  const containsCondition =
    contains && contains !== ''
      ? {
          name: { contains: contains },
        }
      : undefined

  const where =
    category && category !== -1
      ? {
          category_id: category,
          ...containsCondition,
        }
      : containsCondition
      ? containsCondition
      : undefined
  const nowOrderBy = getOrderBy(orderBy)
  try {
    const response = await prisma.products.findMany({
      skip: skip,
      take: take,
      ...nowOrderBy,
      where: where,
    })
    console.log(response + 'asdfads')
    return response
  } catch (error) {
    console.error(error + 'asdfads')
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
  const { skip, take, category, orderBy, contains } = req.query

  if (skip == null || take == null) {
    res.status(400).json({ message: 'skip 혹은 take가 없습니다.' })
    return
  }
  try {
    const products = await getProducts({
      skip: Number(skip),
      take: Number(take),
      category: Number(category),
      orderBy: String(orderBy),
      contains: String(contains),
    })
    console.log(products)
    res.status(200).json({ items: products, message: `Success Products List` })
  } catch (error) {
    res.status(400).json({ message: `Failed Products List` })
  }
}
