import Link from "next/link";
import Head from "next/head";
import Layout from "../components/layout";
import { getAboutData } from "../lib/about";
import Header from "../components/Header";
import Footer from "../components/Footer";

export async function getStaticProps() {
  const aboutData = await getAboutData();
  return {
    props: {
      aboutData,
    },
  };
}

export default function About({ aboutData }) {
  return (
    <div>
      <Head>
        <title>About</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="noindex"></meta>
        <meta charset="utf-8"></meta>
      </Head>
      <Header />
      <Layout>
        <main>
          <div dangerouslySetInnerHTML={{ __html: aboutData.contentHtml }} />
        </main>
      </Layout>
      <aside>
      </aside>
      <Footer />
    </div>
  );
}
