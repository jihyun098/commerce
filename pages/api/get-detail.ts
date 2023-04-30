import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'
import { Result } from 'postcss'

const notion = new Client({
  auth: 'secret_QmQrSTHX6ASdAPWVWupcy3a5XCEeY3TklqDLKNpPTeP',
})

const databaseId = '9635e867d0104fb4a67532eb30b536f8'

async function getDetail(pageId: string, propertyId: string) {
  try {
    const response = await notion.pages.properties.retrieve({
      page_id: pageId,
      property_id: propertyId,
    })
    console.log(response)
    return response
  } catch (error) {
    console.error(JSON.stringify(error))
  }
}
type Data = {
  detail?: any
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { pageId, propertyId } = req.query
    const response = await getDetail(String(pageId), String(propertyId))
    res.status(200).json({ detail: response, message: `Success get Detail` })
  } catch (error) {
    res.status(400).json({ message: `Failed get Detail` })
  }
}
