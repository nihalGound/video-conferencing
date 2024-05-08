import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from "@/components/ui/toaster";
import '@stream-io/video-react-sdk/dist/css/styles.css';
import 'react-datepicker/dist/react-datepicker.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "video-conferencing",
  description: "modern video conferencing app created with nextjs and stream io",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#0E78F9',
          colorBackground: '#1C1F2E',
          colorText: '#ffffff',
          colorInputBackground: '#252A41',
          colorInputText: '#ffffff'
        }
      }}>
      <html lang="en">
        <body className={`${inter.className} bg-dark-2 overflow-x-hidden w-screen h-screen`}>
          {children}
          <Toaster />
        </body>

      </html>
    </ClerkProvider>
  );
}
