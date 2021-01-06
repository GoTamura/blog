import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import toc from 'remark-toc'
import slug from 'remark-slug'
import asciidoctor from 'asciidoctor'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = path.basename(fileName, path.extname(fileName))

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map(fileName => {
    const id = path.basename(fileName, path.extname(fileName))
    return {
      params: {
        id: id,
      }
    }
  })
}

async function md2html(content) {
    const processedContent = await remark()
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

export async function getPostData(id) {
  let [fullPath, ext] = [`.md`, `.adoc`]
    .map((ext) => {return [path.join(postsDirectory, `${id}${ext}`), ext]} )
    .filter((file) => {return fs.existsSync(file[0])})[0]
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)
  let contentHtml = ``
  let contentToc = ``

  if (ext === `.md`) {
    contentHtml = await md2html(matterResult.content)
    //contentHtml = await md2toc(matterResult.content)
  }
  else if (ext == `.adoc`) {
    contentHtml = asciidoctor().convert(matterResult.content)
  }

  // Combine the data with the id
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}