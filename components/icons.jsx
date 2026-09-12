// components/icons.jsx
// Sentralt ikonoppsett – erstatter emoji med Lucide-ikoner (lucide-react),
// pluss ett håndtegnet ikon (tak) der Lucide ikke har noe godt alternativ.
// Alle egne ikoner følger samme konvensjon som Lucide selv: 24x24 viewBox,
// strokeWidth 2, avrundede ender/hjørner, farge arves via currentColor.
import { Zap, Wrench, Hammer, HardHat, PaintRoller, Grid2x2, Shovel, ThermometerSnowflake, Fan, BrickWall } from 'lucide-react';

export function RoofIcon({ size = 24, ...props }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      {...props}
    >
      <path d="M3 12 12 4l9 8" />
      <path d="M6 10v10h12V10" />
    </svg>
  );
}

const BRANSJE_IKON = {
  elektriker: Zap,
  rorlegger: Wrench,
  tomrer: Hammer,
  byggmester: HardHat,
  maler: PaintRoller,
  taklegger: RoofIcon,
  gulvlegger: Grid2x2,
  grunnarbeid: Shovel,
  varmepumpe: ThermometerSnowflake,
  ventilasjon: Fan,
  murer: BrickWall,
};

export function BransjeIkon({ slug, size = 20, ...props }) {
  const Ikon = BRANSJE_IKON[slug] || HardHat;
  return <Ikon size={size} {...props} />;
}
