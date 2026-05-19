// pages/annonsering.jsx
import Layout from '../components/Layout';
import styles from '../styles/Info.module.css';

const PAKKER = [
  {
    navn: 'Fremhevet profil',
    pris: 'Fra 499 kr/mnd',
    punkter: [
      'Vises øverst i din bransje og kommune',
      'Legg til telefon og e-post',
      'Logo og bilder',
      'Beskrivelse av tjenester',
    ],
  },
  {
    navn: 'Bannerplass',
    pris: 'Fra 999 kr/mnd',
    punkter: [
      'Banner på relevante kategorisider',
      'Målretting på bransje og geografi',
      'Desktop og mobil',
      'Rapportering på visninger og klikk',
    ],
  },
  {
    navn: 'Sponset kategori',
    pris: 'Fra 2 499 kr/mnd',
    punkter: [
      'Eksklusiv synlighet i én bransje/kommune',
      '"Presenteres av [din bedrift]"',
      'Lenke til din nettside',
      'Månedlig statistikk',
    ],
  },
];

export default function Annonsering() {
  return (
    <Layout
      title="Annonsering – HåndverkerPortalen"
      description="Nå ut til kunder som aktivt søker håndverkere. Annonsér på HåndverkerPortalen."
    >
      <div className={styles.page}>
        <div className="container--narrow">
          <h1 className={styles.title}>Annonsering</h1>
          <p className={styles.lead}>
            Nå ut til kunder som aktivt søker håndverkere i ditt område.
            HåndverkerPortalen har besøkende med høy kjøpsintensjon.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
            {PAKKER.map(p => (
              <div key={p.navn} className={styles.artikkelKort}>
                <h2 className={styles.artikkelTittel}>{p.navn}</h2>
                <p className={styles.artikkelBransje}>{p.pris}</p>
                <ul className={styles.liste} style={{ marginTop: 10 }}>
                  {p.punkter.map(punkt => (
                    <li key={punkt} className={styles.listeItem}>{punkt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className={styles.cta}>
            <h3 className={styles.ctaTitle}>Interessert?</h3>
            <p className={styles.ctaTekst}>
              Ta kontakt for priser, tilgjengelighet og mer informasjon.
              Vi skreddersyr gjerne en løsning for deg.
            </p>
            <a href="mailto:post@uppit.no" className="btn btn--primary">
              Kontakt oss →
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
