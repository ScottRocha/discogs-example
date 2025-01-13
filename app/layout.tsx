import { Inter } from 'next/font/google';

import { Providers } from './providers';

import '@/styles/globals.css';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={`${inter.className} scroll-smooth`}
      suppressHydrationWarning
    >
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
