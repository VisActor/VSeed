import { callLLM } from './recall'
import { verify } from './verify'

const config = {
  chartType: 'column',
  dataset: [
    { date: '2019-01-01', profit: 10, sales: 20 },
    { date: '2019-01-02', profit: 30, sales: 60 },
    { date: '2019-01-03', profit: 30, sales: 60 },
    { date: '2019-01-04', profit: 50, sales: 100 },
    { date: '2019-01-05', profit: 40, sales: 80 },
    { date: '2019-01-06', profit: 10, sales: 20 },
  ],
}

// const question = '开启图例，显示在图表的右侧；柱子上显示标签'
const question = '2019-01-06位置的profit柱子显示为红色'

const input = {
  q: question,
  spec: config,
  chartType: config.chartType,
}

callLLM(input).then(
  async (res: {
    answer: {
      op: string
      target: string
      value: any
    }[]
  }) => {
    const spec = res.answer

    const newConfig = JSON.parse(JSON.stringify(config))
    spec.forEach((item) => {
      if (item.op === 'add' || item.op === 'update') {
        const target = item.target.split('.')
        let cur = newConfig
        target.forEach((key, index) => {
          if (index === target.length - 1) {
            cur[key] = item.value
          } else {
            cur = cur[key]
          }
        })
      }
    })

    const verifyRes = await verify(question, config, newConfig)

    console.log(verifyRes)
  },
)
