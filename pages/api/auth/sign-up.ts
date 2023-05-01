import type { NextApiRequest, NextApiResponse } from 'next'
import jwtDecode from 'jwt-decode'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
async function signUp(credential: string) {
  const decoded: { name: string; email: string; pricture: string } =
    jwtDecode(credential)

  try {
    const response = await prisma.user.upsert({
      where: {
        email: decoded.email,
      },
      update: {
        name: decoded.name,
        image: decoded.pricture,
      },
      create: {
        email: decoded.email,
        name: decoded.name,
        image: decoded.pricture,
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
  const { credential } = req.query
  try {
    const products = await signUp(String(credential))
    console.log(products)
    res.status(200).json({ items: products, message: `Success Products List` })
  } catch (error) {
    res.status(400).json({ message: `Failed Products List` })
  }
}
