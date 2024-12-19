'use client'

import React, {useContext} from 'react'

import Navigation from '@/components/Navigation/Navigation'
import Footer from '@/components/Footer/Footer'
import { LoadingProvider } from '@/Context/context/LoadingContext';
import { CanvasProvider } from '@/Context/context/CanvasContext';
import { GlobalProvider } from '@/Context/GlobalContext';
import type { Metadata } from "next";

import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <GlobalProvider>
      <LoadingProvider>
        <CanvasProvider>

          <html lang="en">
            <body>
              <Navigation/>
              <main className="flex flex-col">
                {children}
              </main>
            </body>
          </html>

        </CanvasProvider>
      </LoadingProvider>
    </GlobalProvider>
  );
}
