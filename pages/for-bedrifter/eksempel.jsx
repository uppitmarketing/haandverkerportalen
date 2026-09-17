// pages/for-bedrifter/eksempel.jsx
import Head from 'next/head';
import Layout from '../../components/Layout';
import styles from '../../styles/FremhevetEksempel.module.css';
import { Info, BadgeCheck, Star, MessageCircle, Phone, MapPin, Mail } from 'lucide-react';

export default function FremhevetProfilEksempel() {
  return (
    <Layout
      title="Eksempel: Fremhevet profil"
      description="Se hvordan en fremhevet bedriftsprofil kan se ut på HåndverkerPortalen."
      canonical="/for-bedrifter/eksempel"
      skjulHeader
    >
      <Head>
        <meta name="robots" content="noindex,follow" />
      </Head>

      <div className={`container ${styles.side}`}>
        <div className={styles.notis}>
          <Info size={17} />
          <div>
            <strong>Demoside — ikke en ekte bedrift</strong>
            Dette er et eksempel på hvordan en fremhevet profil kan se ut for bedrifter som oppgraderer fra standardoppføringen. Navn og tall under er kun illustrasjon.
          </div>
        </div>

        <div className={styles.kort}>
          <div className={styles.hero}>
            <div className={styles.heroInner}>
              <div className={styles.avatar}>
                <img src="/demo-nordvik-logo.svg" alt="Nordvik Byggmester AS logo" />
              </div>
              <div>
                <div className={styles.tagger}>
                  <span className={styles.badgeFremhevet}>
                    <Star size={11} fill="currentColor" strokeWidth={0} />
                    Fremhevet profil
                  </span>
                </div>
                <div className={styles.navnRad}>
                  <span className={styles.navn}>Nordvik Byggmester AS</span>
                  <BadgeCheck className={styles.verifisert} size={18} />
                </div>
                <div className={styles.adresse}>Byggmester · Markveien 14, 0554 Oslo</div>
              </div>
              <div className={styles.ctaRad}>
                <button className="btn btn--outline"><MessageCircle size={15} /> Send melding</button>
                <button className="btn btn--primary"><Phone size={15} /> Ring nå</button>
              </div>
            </div>

            <div className={styles.statRad}>
              <div className={styles.stat}><div className={styles.statNum}>2011</div><div className={styles.statLabel}>Etablert</div></div>
              <div className={styles.stat}><div className={styles.statNum}>18</div><div className={styles.statLabel}>Ansatte</div></div>
              <div className={styles.stat}><div className={styles.statNum}>4,9</div><div className={styles.statLabel}>Snittvurdering</div></div>
            </div>
          </div>

          <div className={styles.faner}>
            <div className={`${styles.fane} ${styles.faneAktiv}`}>Om</div>
            <div className={styles.fane}>Tjenester</div>
            <div className={styles.fane}>Anmeldelser</div>
            <div className={styles.fane}>Kontakt</div>
          </div>
        </div>

        <div className={styles.layout}>
          <div>
            <div className={styles.boks}>
              <div className={styles.boksTittel}>Om bedriften</div>
              <p className={styles.omTekst}>
                Nordvik Byggmester AS har holdt til på Grünerløkka siden 2011 og tar på seg alt fra tilbygg og garasjer til komplette baderomsrenoveringer i Oslo-området. Vi er sentralt godkjent hos DiBK og stiller alltid med skriftlig, spesifisert tilbud før oppstart.
              </p>
              <div className={styles.tagRad}>
                <span className={styles.tag}>Tilbygg</span>
                <span className={styles.tag}>Garasjer</span>
                <span className={styles.tag}>Bad – totalrenovering</span>
                <span className={styles.tag}>Enebolig nybygg</span>
                <span className={styles.tag}>Takterrasse</span>
              </div>
            </div>
          </div>

          <div>
            <div className={styles.boks}>
              <div className={styles.boksTittel}>Kontaktinfo</div>
              <div className={styles.kontaktListe}>
                <div className={styles.kontaktItem}><MapPin size={16} /> Markveien 14, 0554 Oslo</div>
                <div className={styles.kontaktItem}><Mail size={16} /> post@nordvikbygg.no</div>
                <div className={styles.kontaktItem}><Phone size={16} /> 22 41 05 60</div>
              </div>
              <button className="btn btn--outline" style={{ width: '100%', justifyContent: 'center' }}>Se nettside →</button>
            </div>

            <div className={styles.boks}>
              <div className={styles.boksTittel}>Bedriftsfakta</div>
              <dl className={styles.fakta}>
                <div className={styles.faktaRad}><dt>Org.nr</dt><dd>929 481 002</dd></div>
                <div className={styles.faktaRad}><dt>Org.form</dt><dd>AS</dd></div>
                <div className={styles.faktaRad}><dt>Stiftet</dt><dd>2011</dd></div>
                <div className={styles.faktaRad}><dt>Bransje</dt><dd>Oppføring av bygninger</dd></div>
                <div className={styles.faktaRad}><dt>Status</dt><dd style={{ color: 'var(--green)' }}>Aktiv</dd></div>
              </dl>
            </div>

            <div className={styles.fremhevetInfo}>
              <strong>Dette er en fremhevet profil</strong>
              <p>Bedriften har oppgradert fra standardoppføringen for å vise fram spesialiteter og anmeldelser til flere kunder.</p>
            </div>
          </div>
        </div>

        <div className={styles.ctaBunn}>
          <p>Vil du ha en tilsvarende profil for din bedrift? De 10 første i september får den helt gratis.</p>
          <a href="/for-bedrifter/intro" className="btn btn--primary">Meld deg på gratis →</a>
        </div>
      </div>
    </Layout>
  );
}
