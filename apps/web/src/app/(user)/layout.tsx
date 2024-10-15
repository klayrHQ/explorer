import './globals.css';
import '@repo/ui/styles.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Layout } from '../../components/layout/layoutClient.tsx';
import { ChainNetworkProvider } from '../../providers/chainNetworkProvider.tsx';
import Favicon from '../../public/images/favicon.ico';

export const metadata: Metadata = {
  icons: [
    {
      rel: 'icon',
      url: Favicon.src,
    },
  ],
  title: 'Klayr Explorer',
  description: 'Your go-to place for all things Klayr',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={'overflow-hidden'}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
