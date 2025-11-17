import puppeteer from 'puppeteer'
import OpenAI from 'openai'
import 'dotenv/config'
import { promises as fs } from 'fs'
import path from 'path'

const openai = new OpenAI({
  apiKey: process.env.GPT_API_KEY,
  baseURL: process.env.GPT_BASE_URL,
})

// Function to render a chart using Puppeteer and return a screenshot
async function renderChart(spec: any): Promise<Buffer> {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  // Listen for console events and log them to the terminal
  // page.on('console', msg => console.log(`[33mBROWSER LOG:[0m`, msg.text()));

  await page.setContent(`
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>VChart Demo</title>
    <script src="https://sf-unpkg-src.bytedance.net/@visactor/vchart/build/index.min.js"></script>
    <script src="http://127.0.0.1:52493/llm_test/dist/index.js"></script>
  </head>
  <body>
    <div id="chart" style="width: 600px; height: 400px"></div>
    <script>
      VSeed.registerAll();
      const vseed1 = ${JSON.stringify(spec)}
      const spec = VSeed.Builder.from(vseed1).build()
      const vchart = new VChart.default(spec, { dom: 'chart', animation: false })
      vchart.renderSync()
    </script>
  </body>
</html>
  `)

  // Wait for 1 second to ensure chart is fully rendered
  await page.waitForSelector('canvas')

  const chartContainer = await page.$('#chart')
  if (!chartContainer) {
    throw new Error('Chart container not found')
  }
  const imageBuffer = await chartContainer.screenshot()
  await browser.close()
  return imageBuffer as Buffer
}

// Function to get judgment from OpenAI
async function getOpenAIJudgement(
  command: string,
  image1: Buffer,
  image2: Buffer,
): Promise<{ success: boolean; reason: string }> {
  const image1Base64 = image1.toString('base64')
  const image2Base64 = image2.toString('base64')

  const response = await openai.chat.completions.create({
    model: process.env.GPT_MODEL as string,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `You are a helpful assistant for VSeed, a chart generation tool. Your task is to determine if a new chart configuration successfully fulfills a user's command, based on a "before" and "after" image of the chart. The user's command was: "${command}". Does the "after" image (the second image) correctly reflect this command compared to the "before" image (the first image)? Respond in JSON format with two keys: "success" (a boolean, true if the command was fulfilled) and "reason" (a string explaining your decision).`,
          },
          {
            type: 'image_url',
            image_url: {
              url: `data:image/png;base64,${image1Base64}`,
            },
          },
          {
            type: 'image_url',
            image_url: {
              url: `data:image/png;base64,${image2Base64}`,
            },
          },
        ],
      },
    ],
    max_tokens: 300,
  })

  const content = response?.choices[0]?.message?.content
  if (!content) {
    throw new Error('OpenAI returned an empty content response.')
  }

  // Clean the response to extract the JSON part
  const jsonString = content.replace(/```json\n|```/g, '').trim()
  return JSON.parse(jsonString)
}

// Main verify function
export async function verify(command: string, spec1: any, spec2: any): Promise<{ success: boolean; reason: string }> {
  const resultDir = path.join(process.cwd(), 'verify-result')
  const runId = new Date().toISOString()
  const runDir = path.join(resultDir, runId)

  try {
    // Create a unique directory for this verification run
    await fs.mkdir(runDir, { recursive: true })

    console.log('Rendering initial chart...')
    const image1 = await renderChart(spec1)
    await fs.writeFile(path.join(runDir, 'before.png'), image1)
    console.log('Saved before.png')

    console.log('Rendering modified chart...')
    const image2 = await renderChart(spec2)
    await fs.writeFile(path.join(runDir, 'after.png'), image2)
    console.log('Saved after.png')

    console.log('Getting judgment from OpenAI...')
    const result = await getOpenAIJudgement(command, image1, image2)
    await fs.writeFile(path.join(runDir, 'result.json'), JSON.stringify({ spec1, spec2, result }, null, 2))
    console.log('Saved result.json')

    return result
  } catch (error) {
    console.error('An error occurred during verification:', error)
    const failureResult = { success: false, reason: 'Verification process failed.' }
    await fs.writeFile(path.join(runDir, 'result.json'), JSON.stringify(failureResult, null, 2))
    return failureResult
  }
}
