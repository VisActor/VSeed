import { generateSchema } from "./generate-from-zod"
import { generateMarkdown } from "./generate-markdown"

async function generateDoc() {
  await generateMarkdown()
  await generateSchema()
}

generateDoc().then(() => {
  console.log('generate doc success')
})