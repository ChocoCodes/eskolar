import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from 'next/font/local'

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const satoshi = localFont({
  src:[
    {
      path: '../public/fonts/Satoshi-Black.woff2',
      weight: "900",
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-BlackItalic.woff2',
      weight: "900",
      style: 'italic',
    },
    {
      path: '../public/fonts/Satoshi-Bold.woff2',
      weight: "700",
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-BoldItalic.woff2',
      weight: "700",
      style: 'italic',
    },
    {
      path: '../public/fonts/Satoshi-Italic.woff2',
      weight: "400",
      style: 'italic',
    },
    {
      path: '../public/fonts/Satoshi-Light.woff2',
      weight: "300",
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-LightItalic.woff2',
      weight: "300",
      style: 'italic',
    },
    {
      path: '../public/fonts/Satoshi-Medium.woff2',
      weight: "500",
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-MediumItalic.woff2',
      weight: "500",
      style: 'italic',
    },
    {
      path: '../public/fonts/Satoshi-Regular.woff2',
      weight: "400",
      style: 'normal',
    }
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  title: "eSkolar",
  description: "Centralized Scholarship Management Platform",
  icons: [
    { url: '/eSkolar.ico'},
    { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png'},
    { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png'},
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${satoshi.variable} ${geistSans.variable} ${geistMono.variable} font-satoshi antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
