import {
  Geist_Mono as createMono,
  Geist as createSans,
  Manrope as createManrope,
  Instrument_Serif as createInstrumentSerif,
} from "next/font/google";

export const sans = createSans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

export const mono = createMono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

// Landing page fonts
export const manrope = createManrope({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const instrumentSerif = createInstrumentSerif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
});
