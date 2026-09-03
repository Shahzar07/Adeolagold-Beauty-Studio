import Image from "next/image";
import type { ImageTone } from "@/lib/types";
import { cx } from "@/lib/format";

/* ------------------------------------------------------------------
   EditorialImage
   ------------------------------------------------------------------
   Every image slot on the site goes through this component.

   • Pass `src` and it renders an optimised next/image — this is what you
     use once real campaign photography is available.
   • Omit `src` and it renders a deterministic piece of generative artwork
     built from the brand palette, so the layout, tone and rhythm of the
     site are fully realised before the photography lands. Swapping in a
     photograph is a one-line change per slot (see README).
   ------------------------------------------------------------------ */

interface EditorialImageProps {
  seed: string;
  alt: string;
  tone?: ImageTone;
  src?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/* A tiny deterministic PRNG (mulberry32) so a given seed always produces
   the same artwork on the server and the client. */
function hashSeed(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Palette {
  /** Two or more base/deep pairs — the seed picks one so neighbouring
      tiles never read as the same photograph. */
  grounds: [string, string][];
  glow: string;
  accent: string;
  /** Two-digit hex alpha for the key light. */
  glowAlpha: string;
  strand: string;
  strandOpacity: number;
  strands: number;
  /** Stroke width range. */
  weight: [number, number];
  /** 1 spreads strands edge to edge, 0.5 concentrates them centrally. */
  spread: number;
  vignette: number;
}

const palettes: Record<ImageTone, Palette> = {
  portrait: {
    grounds: [
      ["#4A382C", "#1E1713"],
      ["#3E2E24", "#191310"],
      ["#54402F", "#241C18"],
    ],
    glow: "#E4CFA4",
    glowAlpha: "3D",
    accent: "#B89B65",
    strand: "#FBF6EC",
    strandOpacity: 0.2,
    strands: 16,
    weight: [0.5, 2.4],
    spread: 0.72,
    vignette: 0.5,
  },
  campaign: {
    grounds: [
      ["#33271F", "#100D0B"],
      ["#3B2C21", "#14100D"],
    ],
    glow: "#C9A972",
    glowAlpha: "33",
    accent: "#8D6F4C",
    strand: "#EFE7DA",
    strandOpacity: 0.15,
    strands: 12,
    weight: [0.6, 2.8],
    spread: 0.95,
    vignette: 0.56,
  },
  studio: {
    grounds: [
      ["#F1EBE3", "#CFC3B3"],
      ["#EDE6DC", "#C6B8A6"],
    ],
    glow: "#FFFDFA",
    glowAlpha: "B3",
    accent: "#C9AE7E",
    strand: "#5B4737",
    strandOpacity: 0.17,
    strands: 10,
    weight: [0.4, 1.8],
    spread: 1,
    vignette: 0.2,
  },
  product: {
    grounds: [
      ["#EFE8DF", "#D5C7B6"],
      ["#EBE3D8", "#CDBEAB"],
      ["#F2EBE1", "#D8C7B0"],
    ],
    glow: "#FFFDFA",
    glowAlpha: "B3",
    accent: "#B89B65",
    strand: "#3B2A1B",
    strandOpacity: 0.54,
    strands: 30,
    weight: [0.5, 2.6],
    spread: 0.5,
    vignette: 0.14,
  },
  texture: {
    grounds: [
      ["#6A5240", "#241B15"],
      ["#5C4636", "#1F1813"],
    ],
    glow: "#DCC79C",
    glowAlpha: "38",
    accent: "#B89B65",
    strand: "#F6EEE1",
    strandOpacity: 0.3,
    strands: 34,
    weight: [0.35, 1.5],
    spread: 1,
    vignette: 0.36,
  },
  detail: {
    grounds: [
      ["#5A4636", "#1D1613"],
      ["#4E3B2C", "#1A1411"],
    ],
    glow: "#E8D8B6",
    glowAlpha: "42",
    accent: "#B89B65",
    strand: "#FCF8F1",
    strandOpacity: 0.26,
    strands: 13,
    weight: [0.9, 3.6],
    spread: 0.6,
    vignette: 0.34,
  },
};

export function EditorialImage({
  seed,
  alt,
  tone = "portrait",
  src,
  className,
  sizes = "100vw",
  priority = false,
}: EditorialImageProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cx("object-cover", className)}
      />
    );
  }

  const p = palettes[tone];
  const seedHash = hashSeed(seed);
  const random = rng(seedHash);

  const [base, deep] = p.grounds[seedHash % p.grounds.length];
  const angle = 15 + random() * 70;
  const glowX = 18 + random() * 54;
  const glowY = 10 + random() * 44;
  const accentX = 22 + random() * 56;
  const accentY = 44 + random() * 46;

  // Long, slow curves suggesting the fall of hair. `spread` pulls them towards
  // the centre so lighter tones read as a subject rather than a wash.
  const margin = (1 - p.spread) * 50;
  // A per-image flow factor and tilt so two products never read as the same
  // photograph: some fall almost straight, others carry a deep wave.
  const flow = 0.45 + random() * 1.25;
  const tilt = (random() - 0.5) * 16;

  const strands = Array.from({ length: p.strands }, (_, i) => {
    const x = margin - 12 + random() * (124 - margin * 2);
    const drift = (random() - 0.5) * 40;
    const bow = (16 + random() * 52) * flow;
    const width = p.weight[0] + random() * (p.weight[1] - p.weight[0]);
    const opacity = p.strandOpacity * (0.3 + random() * 0.7);
    return {
      key: i,
      d: `M ${x.toFixed(1)} -8 C ${(x + bow).toFixed(1)} 28, ${(x - bow * 0.66 + drift).toFixed(1)} 66, ${(x + drift).toFixed(1)} 108`,
      width,
      opacity,
    };
  });

  // Everything is painted with CSS gradients and inline stroke colours: the
  // artwork references no SVG <defs> by id, so the same seed can be rendered
  // many times on a page (thumbnail rail, carousel, main view) without the
  // duplicate-id collisions that break url(#…) fills in hidden subtrees.
  return (
    <div
      role="img"
      aria-label={alt}
      className={cx("relative h-full w-full overflow-hidden", className)}
      style={{
        containerType: "size",
        backgroundImage: `linear-gradient(${angle.toFixed(1)}deg, ${base} 0%, ${base} 55%, ${deep} 100%)`,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
        className="absolute inset-0 h-full w-full"
        style={{ filter: "blur(0.85cqw)" }}
      >
        <g transform={`rotate(${tilt.toFixed(1)} 50 50)`}>
          {strands.map((strand) => (
            <path
              key={strand.key}
              d={strand.d}
              fill="none"
              stroke={p.strand}
              strokeWidth={strand.width}
              strokeOpacity={strand.opacity}
              strokeLinecap="round"
            />
          ))}
        </g>
      </svg>

      {/* Key light */}
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(48% 48% at ${glowX.toFixed(0)}% ${glowY.toFixed(0)}%, ${p.glow}${p.glowAlpha} 0%, ${p.glow}12 58%, transparent 100%)`,
        }}
      />
      {/* Warm bounce */}
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(52% 52% at ${accentX.toFixed(0)}% ${accentY.toFixed(0)}%, ${p.accent}33 0%, transparent 100%)`,
        }}
      />
      {/* Vignette */}
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(76% 76% at 50% 46%, transparent 52%, rgba(23, 20, 18, ${p.vignette}) 100%)`,
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------
   ImageFrame — aspect-ratio box with the brand's hover zoom.
   ------------------------------------------------------------------ */

interface ImageFrameProps {
  ratio?: "4/5" | "3/4" | "16/9" | "1/1" | "5/7" | "9/16";
  className?: string;
  children: React.ReactNode;
  /** Adds the slow 1.035 zoom when a parent with `.group` is hovered. */
  zoomOnGroupHover?: boolean;
  grain?: boolean;
}

const ratioClass: Record<NonNullable<ImageFrameProps["ratio"]>, string> = {
  "4/5": "aspect-[4/5]",
  "3/4": "aspect-[3/4]",
  "16/9": "aspect-[16/9]",
  "1/1": "aspect-square",
  "5/7": "aspect-[5/7]",
  "9/16": "aspect-[9/16]",
};

export function ImageFrame({
  ratio = "4/5",
  className,
  children,
  zoomOnGroupHover = false,
  grain = true,
}: ImageFrameProps) {
  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-subtle bg-surface",
        grain && "grain",
        ratioClass[ratio],
        className,
      )}
    >
      <div
        className={cx(
          "absolute inset-0 transition-transform duration-[800ms] ease-lux",
          zoomOnGroupHover && "group-hover:scale-[1.035] motion-reduce:group-hover:scale-100",
        )}
      >
        {children}
      </div>
    </div>
  );
}
