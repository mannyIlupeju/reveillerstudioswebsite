'use client'

import React, {useState, useContext} from 'react'
import Image from 'next/image'
import Navigation from '@/components/Navigation/Navigation'
import Footer from '@/components/Footer/Footer'
import { LoadingProvider } from '@/Context/context/LoadingContext';
import { CanvasProvider } from '@/Context/context/CanvasContext';
import { GlobalProvider } from '@/Context/GlobalContext';
import {Provider} from 'react-redux'
import { store, persistor } from '../../store/store';
import { PersistGate } from 'redux-persist/integration/react';
import type { Metadata } from "next";

import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const [isInitialLoading, setIsInitialLoading] = useState(true);

  

  
  return (
   
     <html lang="en">
      <body>
        <Provider store={store}>
          <PersistGate 
          loading={
            <section className="flex justify-center mt-20 items-center">
            <Image 
            src='/images/footerlogo.png' 
            alt="Loading artwork of Reveillerstudios logo" 
            width={800} height={800} />
            </section>
          } 
          persistor={persistor}>
            <GlobalProvider>
              <LoadingProvider>
                <CanvasProvider>
                  <Navigation/>
                  <main className="flex flex-col">
                    {children}
                  </main>
                  <Footer/>
                </CanvasProvider>
              </LoadingProvider>
            </GlobalProvider>
            </PersistGate>
          </Provider>
        
      </body>
    </html>
    
  );
}

