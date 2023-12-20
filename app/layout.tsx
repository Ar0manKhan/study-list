import type { Metadata } from "next";
import "./globals.css";

import { Navbar } from "./components/navbar";

export const metadata: Metadata = {
  title: "Study List",
  description: "Add links to your study list",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
