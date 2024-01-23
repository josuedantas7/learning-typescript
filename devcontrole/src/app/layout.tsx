import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '@/providers/auth'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dev Controle - Seus sistemas de gerenciamento",
  description: "Gerencie seus clientes e atendimentos de forma facil!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen bg-white text-black`}>
          <AuthProvider>
          <ToastContainer/>
            <main>
              <Header/>
              {children}
            </main>
          </AuthProvider>
      </body>
    </html>
  );
}
