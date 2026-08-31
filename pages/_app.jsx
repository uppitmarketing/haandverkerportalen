// pages/_app.jsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';
import '../styles/globals.css';

function sporSidevisning(path) {
  if (path.startsWith('/admin')) return;
  const user_agent = typeof navigator !== 'undefined' ? navigator.userAgent : null;
  const referrer = typeof document !== 'undefined' ? document.referrer || null : null;
  supabase.from('page_views').insert({ path, user_agent, referrer }).then(() => {}, () => {});
}

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    sporSidevisning(router.asPath);

    const handleRouteChange = url => sporSidevisning(url);
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Component {...pageProps} />;
}
