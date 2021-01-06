import Link from 'next/link'
import Head from 'next/head'
import { getSortedPostsData } from '../lib/posts'
import Date from '../components/date'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Layout from '../components/layout'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Posts({ allPostsData }) {
  return (
    <div className="container">
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="noindex"></meta>
        <meta charset="utf-8"></meta>
      </Head>

      <Header></Header>

      <Layout>
      <main>
        <h1 >Blog</h1>
        <hr/>
        <h2 >Posts</h2>
        <ul >
          {allPostsData.map(({ id, date, title }) => (
            <li key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <Date dateString={date} />
            </li>
          ))}
        </ul>
      </main>
      </Layout>

      <Footer></Footer>
    </div>
  )
}
