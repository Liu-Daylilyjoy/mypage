import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import Navbar from "@/components/common/Navbar/Navbar";

const myFont = localFont({
  src: '../../public/font/Aurora-2.ttf',
});

export const metadata: Metadata = {
  title: "Liudy",
  description: "Liu's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css"></link>
      </head>
      <body
        className={`${myFont.className} `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
