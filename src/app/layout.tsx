'use client'

import React, {useState, useEffect, useContext} from 'react'
import Loading from '@/components/Loading/Loading';
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
            <GlobalProvider>
              <PersistGate loading={<div>loading....</div>} persistor={persistor}>
                <LoadingProvider>
                  <CanvasProvider>
                    <main className="flex flex-col">{children}</main>
                  </CanvasProvider>
                </LoadingProvider>
              </PersistGate>
            </GlobalProvider>
          </Provider>
        
      </body>
    </html>
  );
}

