// lib/supabaseAdmin.js
// KUN for server-side bruk (getServerSideProps/API-routes). Importer aldri
// dette i noe som rendres client-side – service_role-nøkkelen omgår
// Row Level Security fullstendig og må aldri havne i nettleser-bundlen.
import { createClient } from '@supabase/supabase-js';

export function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}
