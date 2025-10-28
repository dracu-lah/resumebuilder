import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ResumeBuilder.js - Free Online Resume Builder with Live Editing",
  icons: {
    icon: "/favicon.ico",
  },
  description:
    "Build professional resumes in minutes with ResumeBuilder.js. Free online resume builder with templates, live editing, PDF export, JSON import/export, and AI-powered suggestions.",
  keywords: [
    "resume builder",
    "free resume maker",
    "online resume creator",
    "resume templates",
    "PDF resume",
    "JSON resume",
    "live edit resume",
    "professional resume",
    "resume download",
    "ATS friendly resume",
  ],
  openGraph: {
    title: "ResumeBuilder.js - Free Online Resume Builder",
    description:
      "Create professional resumes instantly with live editing, multiple templates, PDF export, and JSON support. No signup required.",
    url: "https://resumebuilder.js.org",
    siteName: "ResumeBuilder.js",
    images: [
      {
        url: "https://resumebuilder.js.org/og-image.png",
        width: 1200,
        height: 630,
        alt: "ResumeBuilder.js - Free Online Resume Builder",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ResumeBuilder.js - Free Online Resume Builder",
    description:
      "Build professional resumes with live editing, templates, PDF export, and JSON support. Completely free.",
    images: ["https://resumebuilder.js.org/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>{children}</main>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
