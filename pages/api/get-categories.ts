import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'
import { Result } from 'postcss'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getCategories() {
  try {
    const response = await prisma.categories.findMany({})
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
  try {
    const products = await getCategories()
    console.log(products)
    res.status(200).json({ items: products, message: `Success Products List` })
  } catch (error) {
    res.status(400).json({ message: `Failed Products List` })
  }
}
