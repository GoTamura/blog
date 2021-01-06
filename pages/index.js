import Link from 'next/link'
import Head from 'next/head'
import { getSortedPostsData } from '../lib/posts'
import Header from '../components/Header'
import Footer from '../components/Footer'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({ allPostsData }) {
  return (
    <div className="container">
      <Head>
        <title>cherry.graphics</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="noindex"></meta>
        <meta charset="utf-8"></meta>
      </Head>

      <main>
        <Header></Header>
        <h1 className="about">
          <Link href="/about"><a>About</a></Link>
        </h1>
        <h1 className="posts">
          <Link href="/posts"><a>Blog</a></Link>
        </h1>
      </main>

      <Footer></Footer>

    </div>
  )
}
