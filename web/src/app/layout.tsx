import type { Metadata } from "next";
import { Space_Grotesk, Poppins } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "NovaLabs - DaaS Platform",
  description: "Plataforma de Diseño como Servicio para PyMEs en México",
  keywords: "diseño web, desarrollo web, PyMEs México, sitios web profesionales, diseño como servicio, DaaS",
  authors: [{ name: "NovaLabs", url: "https://novalabs.com" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://novalabs.com",
    title: "NovaLabs - DaaS Platform",
    description: "Plataforma de Diseño como Servicio para PyMEs en México",
    siteName: "NovaLabs",
  },
  twitter: {
    card: "summary_large_image",
    title: "NovaLabs - DaaS Platform",
    description: "Plataforma de Diseño como Servicio para PyMEs en México",
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16.svg', sizes: '16x16', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/site.webmanifest',
  themeColor: '#0147FF',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${poppins.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
