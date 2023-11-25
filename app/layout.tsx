import './globals.css'
import type { Metadata } from 'next'
import {Nunito} from "next/font/google";

import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import HostModal from "./components/modals/HostModal";
import ToasterProvider from "./providers/ToasterProvider";
import SearchModal from './components/modals/SearchModal';
import Footer from "./components/Footer";

import getCurrentUser from './actions/getCurrentUser';

const font=Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'AdrenL',
  description: 'Book your adventure today!',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser=await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <SearchModal />
          <HostModal />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser}/>
        </ClientOnly>
        <div className="pb-20 pt-28">
          {children}
        </div>
        <ClientOnly>
          <Footer />
        </ClientOnly>
      </body>
    </html>
  )
}
