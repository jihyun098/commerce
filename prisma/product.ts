import { PrismaClient, Prisma } from '@prisma/client'
import Products from 'pages/products'

const prisma = new PrismaClient()

const prouductData: Prisma.productsCreateInput[] = Array.apply(
  null,
  Array(15)
).map((_, index) => ({
  name: `${index + 1} 번 모자`,
  contents: `{"blocks":[{"key":"e4e7i","text":"개쩌는 ${
    index + 1
  } 번 모자","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges": [],"data":{}}],"entityMap":{}}`,
  category_id: 3,
  image_url: `https://picsum.photos/id/101${
    (index + 1) % 10 === 0 ? 10 : (index + 1) % 10
  }/250/150`,
  price: Math.floor(Math.random() * (100000 - 20000) + 20000),
}))

async function main() {
  //await prisma.products.deleteMany({})
  for (const p of prouductData) {
    const product = await prisma.products.create({
      data: p,
    })
    console.log(`id: ${product.id}`)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.log(e)
    await prisma.$disconnect()
    process.exit(1)
  })
