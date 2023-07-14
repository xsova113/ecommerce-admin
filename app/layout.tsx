import "./globals.css";
import { Inter } from "next/font/google";
import { ChakraProviders } from "../providers/chakraProviders";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/providers/modal-provider";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/providers/theme-provider";

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
        <body className={`${inter.className} dark:bg-slate-900 dark:text-white h-fit`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ChakraProviders>
              <ModalProvider />
              {children}
            </ChakraProviders>
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
