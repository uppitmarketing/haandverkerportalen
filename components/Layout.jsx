// components/Layout.jsx
import Head from 'next/head';
import Script from 'next/script';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children, title, description, canonical }) {
  const siteTitle = title
    ? `${title} | HåndverkerPortalen`
    : 'HåndverkerPortalen – Finn håndverkere i Norge';
  const metaDesc = description ||
    'Finn kvalifiserte håndverkere nær deg. Søk blant 45 000+ elektrikere, rørleggere, tømrere og andre fagfolk i hele Norge.';

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={metaDesc} />
        {canonical && <link rel="canonical" href={`https://haandverkerportalen.no${canonical}`} />}
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-KH5WL9F2');`}} />
      </Head>
      {/* GTM noscript */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-KH5WL9F2"
          height="0" width="0"
          style={{display:'none',visibility:'hidden'}}
        />
      </noscript>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
