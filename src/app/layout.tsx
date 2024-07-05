import "@/styles/globals.css";

import { Plus_Jakarta_Sans } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { Toaster } from "@/components/ui/toaster";
import { NavBar } from "@/components/nav-bar";

const pjs = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Kate Talks Travel",
  description: "Created by Kate Lakey, a travel enthusiast.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${pjs.variable}`}>
      <body>
        <NavBar />
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  );
}
