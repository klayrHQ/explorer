import "./globals.css";
import "@repo/ui/theme.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import {Layout} from "../../components/layout/layoutClient.tsx";
import {ChainNetworkProvider} from "../../providers/chainNetworkProvider.tsx";

export const metadata: Metadata = {
  title: "Klayr Explorer",
  description: "Your go-to place for all things Klayr",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
      <ChainNetworkProvider>
        <Layout>
          {children}
        </Layout>
      </ChainNetworkProvider>
      </body>
    </html>
  );
}
