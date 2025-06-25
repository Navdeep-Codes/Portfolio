import type { Metadata } from "next";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://www.navdeepsingh.tech";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Navdeep",
  description: "I'm Navdeep, Building awesome stuff!",
  icons: {
    icon: [
      {
        url: "/favicon.png",
        sizes: "any",
      },
    ],
  },
  
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    title: "Navdeep",
    description: "I'm Navdeep, Building awesome stuff!",
    images: [
      {
        url: "https://navdeepsingh.tech/opengraph-image.png",
        width: 1200,
        height: 634,
        alt: "Navdeep making awesome stuff",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@404Navdeep",
    title: "Navdeep",
    description: "I'm Navdeep, Building awesome stuff!",
    images: [
      {
        url: "https://navdeepsingh.tech/opengraph-image.png",
        alt: "Navdeep, Building awesome stuff!",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
};
