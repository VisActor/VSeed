import { generateSchema } from "./generate-from-zod"
import { generateMarkdown } from "./generate-markdown"

async function generateDoc() {
  await generateSchema()
  console.log('generate schema success')
  await generateMarkdown()
}

generateDoc().then(() => {
  console.log('generate doc success')
})