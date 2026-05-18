// components/Layout.jsx
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children, title, description, canonical }) {
  const siteTitle = title
    ? `${title} | HåndverkerPortalen`
    : 'HåndverkerPortalen – Finn håndverkere i Norge';
  const metaDesc = description ||
    'Finn kvalifiserte håndverkere nær deg. Søk blant 28 000+ elektrikere, rørleggere, tømrere og andre fagfolk i hele Norge.';

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={metaDesc} />
        {canonical && <link rel="canonical" href={`https://haandverkerportalen.no${canonical}`} />}
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
