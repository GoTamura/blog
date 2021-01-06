import Layout from "../../components/layout";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Date from "../../components/date";
import Head from "next/head";

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Post({ postData }) {
  return (
    <div>
      <Head>
        <title>{postData.title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="noindex"></meta>
        <meta charset="utf-8"></meta>
      </Head>

      <Header />

      <Layout>
        <main>
          <h1>{postData.title}</h1>
          <Date dateString={postData.date} />
          <hr />
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </main>
      </Layout>

      <aside>
      </aside>

      <Footer />
    </div>
  );
}
