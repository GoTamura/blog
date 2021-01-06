import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import toc from 'remark-toc'
import slug from 'remark-slug'
import recommended from 'remark-preset-lint-recommended'

const aboutDirectory = path.join(process.cwd(), 'about')

async function md2html(content) {
    const processedContent = await remark()
    .use(recommended)
    .use(html)
    .process(content)
    return processedContent.toString()
}

async function md2toc(content) {
    const processedContent = await remark()
    .use(toc)
    .use(slug)
    .use(html)
    .process(content)
    return processedContent.toString()
}

export async function getAboutData() {
  let fullPath = path.join(aboutDirectory, `rejume.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  const contentHtml = await md2html(matterResult.content)
  //const contentHtml = await md2toc(matterResult.content)

  // Combine the data with the id
  return {
    contentHtml,
  }
}