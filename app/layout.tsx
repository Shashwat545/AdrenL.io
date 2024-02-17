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
import AuthContext from './providers/AuthProvider';
import LayoutHelper from "@/app/helper/index"
import VerificationAlert from './components/VerificationAlert';
import { Host, User } from '@prisma/client';

const font=Nunito({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: 'AdrenL',
    description: 'Book your adventure today!',
}
interface LayoutProps {
    children: React.ReactNode;
}

interface UserIncludesHostProps extends User{
  host: Host
}

export default async function RootLayout({
  children
}: LayoutProps) {
  const currentUser=await getCurrentUser() as UserIncludesHostProps;
  const isVerified = currentUser?.emailVerified;
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
        <LayoutHelper>
          <AuthContext>
          {children}
          </AuthContext>
        </LayoutHelper>
        <ClientOnly>
          <Footer />
        </ClientOnly>
      </body>
    </html>
  )
}