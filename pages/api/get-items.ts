import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'
import { Result } from 'postcss'

const notion = new Client({
  auth: 'secret_QmQrSTHX6ASdAPWVWupcy3a5XCEeY3TklqDLKNpPTeP',
})

const databaseId = '9635e867d0104fb4a67532eb30b536f8'

async function getProducts() {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: 'price',
          direction: 'ascending',
        },
      ],
    })
    console.log(response)
    return response
  } catch (error) {
    console.error(JSON.stringify(error))
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
    const response = await getProducts()
    res
      .status(200)
      .json({ items: response?.results, message: `Success Products List` })
  } catch (error) {
    res.status(400).json({ message: `Failed Products List` })
  }
}
