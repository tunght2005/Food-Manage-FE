import type { Metadata } from 'next'
import { Geist_Mono, Roboto, Oxanium } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/theme-provider'
import AppProvider from '@/components/app-provider'

const oxaniumHeading = Oxanium({
  subsets: ['latin'],
  variable: '--font-heading'
})

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-sans'
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono'
})

export const metadata: Metadata = {
  title: 'Big Boy Restaurant',
  description: 'The best restaurant in the world'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={cn('h-full antialiased', roboto.variable, geistMono.variable, oxaniumHeading.variable, 'font-sans')}
    >
      <body className='min-h-full flex flex-col'>
        <AppProvider>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  )
}
