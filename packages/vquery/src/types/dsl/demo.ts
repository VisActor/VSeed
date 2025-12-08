import { QueryDSL } from './QueryDSL'

interface USer {
  a: string
  b: number
}

const a: QueryDSL<USer> = {
  select: ['a', 'b', { field: 'a', alias: 'a_alias' }],
}
console.log(a)
