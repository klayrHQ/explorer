import "./globals.css";
import "@repo/ui/theme.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import {Layout} from "@repo/ui/templates";
import Logo from "../assets/images/logo.svg"
import {chainNetworkData, kpisObject, menuItems, mobileMenuItems} from "../utils/constants.tsx";

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
        <Layout
          chainNetworkData={chainNetworkData}
          kpis={kpisObject}
          logo={{
            logoSrc: Logo.src,
            altText: "Klayr Explorer",
            logoText: "klayr",
          }}
          menuItems={menuItems}
          mobileMenuItems={mobileMenuItems}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
