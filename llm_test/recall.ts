import OpenAI from 'openai'
import { DSL_PROMPT } from './prompt'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

// const __dirname = import.meta.dirname;

dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

// 加载../md/column.md
const columnKnowledge = fs.readFileSync(path.resolve(__dirname, './md_for_llm/Column.md'), 'utf-8')

const config = {
  apiKey: process.env.GPT_API_KEY,
  model: process.env.GPT_MODEL,
  // temperature: 0.7,
  baseURL: process.env.GPT_BASE_URL,
}

export async function callLLM(input: { q: string; spec: any; chartType: string }) {
  // 创建OpenAI客户端
  const openai = new OpenAI({
    apiKey: config.apiKey,
    baseURL: config.baseURL,
  })

  const systemPrompt = DSL_PROMPT.replace('{{knowledge}}', columnKnowledge)

  try {
    // 调用OpenAI API
    const response = await openai.chat.completions.create({
      model: config.model || 'gpt-3.5-turbo',
      // temperature: config.temperature || 0.7,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: JSON.stringify(input) },
      ],
      response_format: { type: 'json_object' },
      thinking: {
        type: 'disabled',
      },
    } as any)

    // 解析JSON响应
    const answer = JSON.parse(response?.choices?.[0]?.message?.content || '{}')
    console.log(answer)
    return answer
  } catch (error) {
    console.error('调用OpenAI API失败:', error)
    throw new Error('Failed to call OpenAI API: ' + (error as any).message)
  }
}
