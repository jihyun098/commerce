export const CATEGORY_MAP = ['Sneakers', 'T-Shirt', 'Cap', 'Acc']

export const TAKE = 9

export const FILTERS = [
  { label: '최신순', value: 'latest' },
  { label: '가격 높은 순', value: 'highPrice' },
  { label: '가격 낮은 순', value: 'lowPrice' },
]

export const getOrderBy = (orderBy?: string) => {
  return orderBy
    ? orderBy === 'latest'
      ? { orderBy: { createAt: 'desc' } }
      : orderBy === 'highPrice'
      ? { orderBy: { price: 'desc' } }
      : { orderBy: { price: 'asc' } }
    : undefined
}
