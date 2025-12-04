import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/app/register-sw";
import { Header } from "@/components/Header";
import { NavBar } from "@/components/NavBar";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata para PWA
export const metadata: Metadata = {
  title: "Sorveteria Raio de Sol",
  description: "Sistema de gerenciamento de gastos e lucros da sorveteria",
  generator: "Next.js",

  themeColor: "#FBFBFB",

  icons: {
    icon: [
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },

  manifest: "/manifest.webmanifest",

  authors: [
    {
      name: "Myst1 Dev",
      url: "https://www.mystdev.com.br",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Garantindo que o manifest seja carregado */}
        <link rel="manifest" href="/manifest.webmanifest" />

        <meta name="theme-color" content="#FBFBFB" />

        <link rel="icon" href="/icon-192x192.png" />

        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="default"
        />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        <NavBar />
        {children}
        <ToastContainer position="top-right" theme="colored" />
      </body>
    </html>
  );
}