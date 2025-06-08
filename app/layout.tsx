import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Balaji Gunasekaran - Electronics & Software Engineer",
  description:
    "Portfolio of Balaji Gunasekaran - Electronics & Communication Engineering student specializing in IoT, hardware design, and full-stack development.",
  keywords: ["Electronics Engineer", "Software Developer", "IoT", "Arduino", "React", "Next.js"],
  authors: [{ name: "Balaji Gunasekaran" }],
  openGraph: {
    title: "Balaji Gunasekaran - Electronics & Software Engineer",
    description: "Turning Electronics & Code into Innovation",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
