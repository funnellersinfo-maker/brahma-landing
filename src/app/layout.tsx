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
  title: "COMBO BRAHMA Moster Zapatos + Gorra | Pago Contra Entrega en Colombia",
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
    title: "COMBO BRAHMA Moster Zapatos + Gorra",
    description:
      "Tenis urbanos premium + gorra bordada. Pago Contra Entrega en toda Colombia. Envío gratis y garantía de 30 días.",
    siteName: "BRAHMA",
    type: "website",
    locale: "es_CO",
  },
  twitter: {
    card: "summary_large_image",
    title: "COMBO BRAHMA Moster Zapatos + Gorra",
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
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1490244115728044');fbq('track','PageView');`,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1490244115728044&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
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
