import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import Head from "next/head";
import React from "react";

// component
import { Toaster } from "@/components/ui/sonner";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: "QuizKita",
  description: "Platform edukasi berbasis kuis",
  other: {
    "dicoding:email": "akhmad.ardiansyah1711@gmail.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${openSans.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
