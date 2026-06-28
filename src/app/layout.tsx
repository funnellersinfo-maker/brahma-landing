import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "COMBO BRAHMA Monster Zapatos + Gorra | Pago Contra Entrega en Colombia",
  description:
    "Combo premium de tenis urbanos BRAHMA + gorra bordada. Envío gratis a todo Colombia. Pago Contra Entrega: pagas solo al recibir. Garantía de 30 días.",
  keywords: [
    "tenis urbanos",
    "gorra premium",
    "combo tenis y gorra",
    "pago contra entrega Colombia",
    "tenis Bogotá",
    "tenis Medellín",
    "zapatillas urbanas",
    "BRAHMA",
    "envío gratis Colombia",
  ],
  authors: [{ name: "BRAHMA" }],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  icons: {
    icon: "/images/logo-brahma.png",
    apple: "/images/logo-brahma.png",
  },
  openGraph: {
    title: "COMBO BRAHMA Monster Zapatos + Gorra",
    description:
      "Tenis urbanos premium + gorra bordada. Pago Contra Entrega en toda Colombia. Envío gratis y garantía de 30 días.",
    siteName: "BRAHMA",
    type: "website",
    locale: "es_CO",
  },
  twitter: {
    card: "summary_large_image",
    title: "COMBO BRAHMA Monster Zapatos + Gorra",
    description:
      "Tenis urbanos premium + gorra bordada. Pago Contra Entrega en Colombia. Envío gratis.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Progressive enhancement: habilita animaciones reveal solo con JS.
            Sin JS, todo el contenido queda visible (SEO + robustez). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('lp-js');",
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${sora.variable} antialiased`}
        style={{ background: "var(--lp-bone, #f5f2ec)" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
