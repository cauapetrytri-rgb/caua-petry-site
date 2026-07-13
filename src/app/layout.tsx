import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://caua-petry-site.vercel.app"),
  title: {
    default: "Cauã Petry | Ecossistema Digital para Empresas",
    template: "%s | Cauã Petry",
  },
  description:
    "Ecossistema digital com posicionamento, site, captação, WhatsApp e dados para empresas que querem vender como grandes marcas.",
  keywords: [
    "Cauã Petry",
    "ecossistema digital para empresas",
    "estrutura digital para vendas",
    "método EDV",
    "mídia paga",
    "tráfego pago",
    "landing pages",
    "captação digital",
    "WhatsApp comercial",
    "automações",
    "tracking",
    "dados comerciais",
    "WhatsApp",
  ],
  authors: [{ name: "Cauã Petry" }],
  creator: "Cauã Petry",
  publisher: "Cauã Petry",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Cauã Petry | Ecossistema Digital para Empresas",
    description:
      "Posicionamento, site, captação, WhatsApp e dados conectados para vender melhor.",
    type: "website",
    locale: "pt_BR",
    siteName: "Cauã Petry",
    url: "/",
    images: [{ url: "/assets/hero-command-center.png", width: 1200, height: 630, alt: "Portfólio de Cauã Petry" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cauã Petry | Ecossistema Digital para Empresas",
    description:
      "Ecossistema digital para empresas que querem vender como grandes marcas.",
    images: ["/assets/hero-command-center.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Cauã Petry",
  url: "https://caua-petry-site.vercel.app",
  areaServed: "Brasil",
  serviceType: [
    "Ecossistema digital para empresas",
    "Posicionamento digital",
    "Landing pages premium",
    "Captação digital",
    "WhatsApp comercial",
    "Automacao comercial",
  ],
  description:
    "Ecossistema digital com posicionamento, site, captação, WhatsApp e dados para empresas que querem vender como grandes marcas.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "comercial",
    telephone: "+55 48 99969-9136",
    availableLanguage: ["Portuguese", "pt-BR"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
