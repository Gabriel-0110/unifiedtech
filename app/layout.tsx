import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { LiveChatWidget } from '@/components/chat/LiveChatWidget'
import { CopilotWidget } from '@/components/chat/CopilotWidget'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: process.env.SITE_NAME || 'UnifiedTech Solutions by G&G',
  description: process.env.SITE_DESCRIPTION || 'Professional technology solutions for modern businesses. A division of ALVES & ARAUJO TOURISM SERVICES, LLC',
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='dark'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}> 
        <Header />
        {children}
        <Footer />
        <LiveChatWidget />
        <CopilotWidget />
      </body>
    </html>
  )
}
