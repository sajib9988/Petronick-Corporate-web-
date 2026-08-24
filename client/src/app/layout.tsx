import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const SITE_URL = "https://petronickholdings.com";
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Petronick Corporate Holdings LLC | Pittsburgh Holding Company",
    template: "%s | Petronick Corporate Holdings",
  },
  description:
    "Petronick Corporate Holdings LLC is a Pittsburgh-based holding company operating multiple revenue-generating business units across digital, fulfillment, advisory, and e-commerce sectors.",
  keywords: [
    "Petronick Corporate Holdings",
    "Pittsburgh holding company",
    "business units",
    "promotion agent program",
    "B2B2C holding company",
  ],
  authors: [{ name: "Petronick Corporate Holdings LLC" }],
  openGraph: {
    title: "Petronick Corporate Holdings LLC",
    description:
      "A vertically integrated holding company operating multiple revenue-generating business units under one strategic roof.",
    url: SITE_URL,
    siteName: "Petronick Corporate Holdings",
    locale: "en_US",
    type: "website",
    // images: [{ url: "/og-image.png", width: 1200, height: 630 }], // add korle image lagbe /public e
  },
  twitter: {
    card: "summary_large_image",
    title: "Petronick Corporate Holdings LLC",
    description:
      "A vertically integrated holding company operating multiple revenue-generating business units.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className={`${geistSans.className} min-h-full flex flex-col`}>
        
    
          {children}
        
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
