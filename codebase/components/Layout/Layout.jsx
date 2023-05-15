import { Inter } from 'next/font/google';
import Image from 'next/image';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export const siteTitle = 'HappyHead';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <meta name="description" content='Your Mental Health Companion' />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}