import type { Metadata } from "next";
import { Inter, Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Sahil — Cinematic Fake 3D Portfolio",
  description: "Scroll-based cinematic layered depth (fake 3D).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${mono.variable} h-full antialiased selection:bg-blue-500 selection:text-white scroll-smooth`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden bg-black text-white font-inter">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
