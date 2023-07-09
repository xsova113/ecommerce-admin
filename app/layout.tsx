import "./globals.css";
import { Inter } from "next/font/google";
import { ChakraProviders } from "../providers/chakraProviders";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/providers/modal-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={{ variables: { colorPrimary: "black" } }}>
      <html lang="en">
        <body className={inter.className}>
          <ChakraProviders>
            <ModalProvider />
            {children}
          </ChakraProviders>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
