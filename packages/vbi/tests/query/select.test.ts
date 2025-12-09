import type { DatasetColumn, RawDatasetSource, VQueryDSL } from '@visactor/vquery'
import { VQuery } from '@visactor/vquery'
import { VBI } from '@visactor/vbi'

describe('select', () => {
  test('select', async () => {
    const vquery = new VQuery()

    const connectorId = 'demoDataset'

    VBI.registerConnector('demoDataset', async () => {
      return {
        discoverSchema: async () => {
          return [
            { name: 'id', type: 'string' },
            { name: 'order_id', type: 'string' },
            { name: 'order_date', type: 'date' },
            { name: 'delivery_date', type: 'date' },
            { name: 'delivery_method', type: 'string' },
            { name: 'customer_id', type: 'string' },
            { name: 'customer_name', type: 'string' },
            { name: 'customer_type', type: 'string' },
            { name: 'city', type: 'string' },
            { name: 'province', type: 'string' },
            { name: 'country_or_region', type: 'string' },
            { name: 'area', type: 'string' },
            { name: 'product_id', type: 'string' },
            { name: 'product_type', type: 'string' },
            { name: 'product_sub_type', type: 'string' },
            { name: 'product_name', type: 'string' },

            { name: 'sales', type: 'number' },
            { name: 'amount', type: 'number' },
            { name: 'discount', type: 'number' },
            { name: 'profit', type: 'number' },
          ]
        },
        query: async ({ queryDSL, schema }) => {
          if (!(await vquery.hasDataset(connectorId))) {
            const url = 'https://visactor.github.io/VSeed/dataset/supermarket.csv'
            const datasetSource = { type: 'csv', rawDataset: url }
            await vquery.createDataset(connectorId, schema as DatasetColumn[], datasetSource as RawDatasetSource)
          }
          const dataset = await vquery.connectDataset(connectorId)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const queryResult = await dataset.query(queryDSL as VQueryDSL<any>)

          await dataset.disconnect()
          await vquery.close()

          return {
            dataset: queryResult.dataset,
          }
        },
      }
    })

    const builder = VBI.from(VBI.generateEmptyDSL(connectorId))

    builder.measures
      .addMeasure('sales', (node) => {
        node.setAlias('Sum(sales)').setAggregate({ func: 'sum' })
      })
      .addMeasure('profit', (node) => {
        node.setAlias('Sum(profit)').setAggregate({ func: 'sum' })
      })

    builder.dimensions
      .addDimension('area', (node) => {
        node.setAlias('区域')
      })
      .addDimension('province', (node) => {
        node.setAlias('省份')
      })

    const vseed = await builder.buildVSeed()

    expect(vseed).toMatchInlineSnapshot(`
      {
        "chartType": "table",
        "dataset": [
          {
            "Sum(profit)": -131728.99600000013,
            "Sum(sales)": 452108.2440000001,
            "区域": "华东",
            "省份": "浙江",
          },
          {
            "Sum(profit)": -89487.52399999995,
            "Sum(sales)": 400877.5960000003,
            "区域": "西南",
            "省份": "四川",
          },
          {
            "Sum(profit)": -107603.02000000003,
            "Sum(sales)": 649967.2200000006,
            "区域": "华东",
            "省份": "江苏",
          },
          {
            "Sum(profit)": 337994.9929999998,
            "Sum(sales)": 1452929.5129999993,
            "区域": "中南",
            "省份": "广东",
          },
          {
            "Sum(profit)": 47807.06000000001,
            "Sum(sales)": 237328.70000000013,
            "区域": "华东",
            "省份": "江西",
          },
          {
            "Sum(profit)": 105814.68799999998,
            "Sum(sales)": 457688.16800000006,
            "区域": "西北",
            "省份": "陕西",
          },
          {
            "Sum(profit)": 257172.06199999977,
            "Sum(sales)": 1178801.1620000016,
            "区域": "东北",
            "省份": "黑龙江",
          },
          {
            "Sum(profit)": 385463.008,
            "Sum(sales)": 1586782.9879999978,
            "区域": "华东",
            "省份": "山东",
          },
          {
            "Sum(profit)": 121650.088,
            "Sum(sales)": 582450.5679999999,
            "区域": "华东",
            "省份": "上海",
          },
          {
            "Sum(profit)": 172031.6850000001,
            "Sum(sales)": 790915.405,
            "区域": "华北",
            "省份": "河北",
          },
          {
            "Sum(profit)": 142601.73200000002,
            "Sum(sales)": 546903.5320000001,
            "区域": "华东",
            "省份": "福建",
          },
          {
            "Sum(profit)": 149028.81000000008,
            "Sum(sales)": 628965.1899999997,
            "区域": "华东",
            "省份": "安徽",
          },
          {
            "Sum(profit)": -42682.192,
            "Sum(sales)": 179270.02800000008,
            "区域": "西北",
            "省份": "甘肃",
          },
          {
            "Sum(profit)": 153058.17100000003,
            "Sum(sales)": 640196.5709999998,
            "区域": "东北",
            "省份": "吉林",
          },
          {
            "Sum(profit)": -168038.7240000001,
            "Sum(sales)": 862569.7359999995,
            "区域": "东北",
            "省份": "辽宁",
          },
          {
            "Sum(profit)": -132032.34800000003,
            "Sum(sales)": 621960.3320000009,
            "区域": "中南",
            "省份": "湖北",
          },
          {
            "Sum(profit)": 199528.67900000006,
            "Sum(sales)": 853574.798999999,
            "区域": "中南",
            "省份": "河南",
          },
          {
            "Sum(profit)": 156735.92899999995,
            "Sum(sales)": 723442.2090000004,
            "区域": "中南",
            "省份": "湖南",
          },
          {
            "Sum(profit)": 91961.94000000003,
            "Sum(sales)": 409147.2,
            "区域": "华北",
            "省份": "北京",
          },
          {
            "Sum(profit)": 64431.752000000066,
            "Sum(sales)": 361761.9320000001,
            "区域": "西南",
            "省份": "重庆",
          },
          {
            "Sum(profit)": 12277.299999999997,
            "Sum(sales)": 49863.38,
            "区域": "西北",
            "省份": "青海",
          },
          {
            "Sum(profit)": 84724.26900000003,
            "Sum(sales)": 377653.82899999997,
            "区域": "中南",
            "省份": "广西",
          },
          {
            "Sum(profit)": 117704.08999999998,
            "Sum(sales)": 549906.6300000001,
            "区域": "华北",
            "省份": "天津",
          },
          {
            "Sum(profit)": 86639.16800000003,
            "Sum(sales)": 360925.76800000016,
            "区域": "西南",
            "省份": "云南",
          },
          {
            "Sum(profit)": 15788.332,
            "Sum(sales)": 61402.431999999986,
            "区域": "西南",
            "省份": "海南",
          },
          {
            "Sum(profit)": 18998.420000000006,
            "Sum(sales)": 108141.59999999999,
            "区域": "西南",
            "省份": "贵州",
          },
          {
            "Sum(profit)": 107063.39000000009,
            "Sum(sales)": 423878.76999999967,
            "区域": "华北",
            "省份": "山西",
          },
          {
            "Sum(profit)": -57707.88800000001,
            "Sum(sales)": 273453.01199999993,
            "区域": "华北",
            "省份": "内蒙古",
          },
          {
            "Sum(profit)": 8537.62,
            "Sum(sales)": 58121,
            "区域": "西北",
            "省份": "宁夏",
          },
          {
            "Sum(profit)": 23933.790999999994,
            "Sum(sales)": 107854.41100000001,
            "区域": "中南",
            "省份": "海南",
          },
          {
            "Sum(profit)": 14606.059999999998,
            "Sum(sales)": 70097.02,
            "区域": "西北",
            "省份": "新疆",
          },
          {
            "Sum(profit)": 1266.5800000000002,
            "Sum(sales)": 10015.18,
            "区域": "西南",
            "省份": "西藏自治区",
          },
        ],
      }
    `)
  })
})
