import type { Metadata } from "next";

// Luxury theme fonts — loaded and optimized by Next.js.
import { Cormorant_Garamond, DM_Sans, Geist_Mono } from "next/font/google";

// Original font imports kept here for easy rollback:
// import { Poppins, Josefin_Slab } from "next/font/google";

import "./globals.css";
import { Toaster } from "@/components/ui/toast";
import { getSiteUrl } from "@/utils/site-url";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

// Original font setup — kept commented out for easy rollback:
// const poppins = Poppins({
//   subsets: ["latin"],
//   variable: "--font-poppins",
//   weight: ["400", "500", "600", "700"],
// });
//
// const josefinSlab = Josefin_Slab({
//   subsets: ["latin"],
//   variable: "--font-josefin-slab",
// });

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "Fragrance Store",
  description: "Fragrance e-commerce store",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${cormorantGaramond.variable} ${geistMono.variable}`}
    >
      <body>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
