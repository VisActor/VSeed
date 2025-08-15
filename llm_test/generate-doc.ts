import { generateSchema } from "./generate-from-zod"
import { generateMarkdown } from "./generate-markdown"

async function generateDoc() {
  await generateSchema()
  await generateMarkdown()
}

generateDoc().then(() => {
  console.log('generate doc success')
})