import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Queryprovider from "../utils/Queryprovider";

import { SearchProvider } from "@/context/searchContex";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  viewport: "width=device-width, initial-scale=1.0",
  title: "Nike Clone",
  description: "Nike Clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Queryprovider>
          <SearchProvider>
            <AuthProvider>
              {children}

              {/* <Footer /> */}
            </AuthProvider>
          </SearchProvider>
        </Queryprovider>
      </body>
    </html>
  );
}
