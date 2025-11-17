const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')

async function main() {
  // 递归读取/packages/vseed/tests目录下的所有json文件
  const files = fs
    .readdirSync(path.resolve(__dirname, '../packages/vseed/tests'), { recursive: true })
    .filter((file) => file.endsWith('.json'))

  // 删除bugserver上的所有VSeed同case
  fetch('https://bugserver.cn.goofy.app/api/file/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      product: 'VSeed',
    }),
  })
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error))

  // 遍历每个json文件
  for (const file of files) {
    if (file === 'tsconfig.json') {
      continue
    }

    // 读取json文件内容
    const content = fs.readFileSync(path.resolve(__dirname, `../packages/vseed/tests/${file}`), 'utf8')

    const code = `const {
  registerAll,
  VSeed,
  Builder,
  isPivotChart,
  isVChart,
  isPivotTable,
  isTable,
  zVSeed,
  ColorIdEncoding,
} = window.VSeed;

registerAll()
VTable.register.chartModule('vchart', VChart.default)

// your code here
const dom = document.querySelector('#' + window.BUGSERVER_CONTAINER_ID);
const vseed = ${content}

const theme = 'light'
const builder = Builder.from({ ...vseed, theme })
const spec = builder.build()
console.log('builder', builder) 
console.log('builder performance', builder.performance)

let instance;
if (isPivotChart(vseed)) {
  delete spec.animationAppear
  const tableInstance = new VTable.PivotChart(dom, spec)
  instance = tableInstance
} else if (isVChart(vseed)) {
  const vchart = new VChart.default(spec, { dom: dom, animation: false })
  vchart.renderSync()
  instance = vchart
} else if (isTable(vseed)) {
  delete spec.animationAppear
  const tableInstance = new VTable.ListTable(dom, spec)
  instance = tableInstance
} else if (isPivotTable(vseed)) {
  delete spec.animationAppear
  const tableInstance = new VTable.PivotTable(dom, spec)
  instance = tableInstance
}

// collect time data
// window.BUGSERVER_REPORT({ time: performance.now() - startTime }); 
// or get a screenshot
window.BUGSERVER_SCREENSHOT(); 

// do some unmount operation
window.BUGSERVER_RELEASE(()=>{
  instance.release();
});
    `

    // // code 保存到文件，路径不存在时创建
    // const dir = path.resolve(__dirname, `./${path.dirname(file)}`);
    // if (!fs.existsSync(dir)) {
    //   fs.mkdirSync(dir, { recursive: true });
    // }

    // fs.writeFileSync(path.resolve(__dirname, `./${file.replace('.json', '.js')}`), code);

    const dir = `vseed-sync/${path.dirname(file)}`
    const fileName = path.basename(file, '.json')
    // console.log('dir', dir, 'fileName', fileName)
    // 发送POST请求到bugserver
    const response = await fetch('https://bugserver.cn.goofy.app/api/file/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        file: {
          content: code,
          name: fileName,
          product: 'VSeed',
          folderName: dir,
          tag: ['photo'],
        },
      }),
    })

    // 打印响应结果
    console.log(`Sync ${file} to bugserver: ${JSON.stringify(response, null, 2)}`)
  }
}

main()
