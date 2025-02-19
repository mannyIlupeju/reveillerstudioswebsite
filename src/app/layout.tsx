'use client'

import React, {useContext} from 'react'

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
  
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
            <GlobalProvider>
              <LoadingProvider>
                <CanvasProvider>
                  <Navigation/>
                  <main className="flex flex-col">
                    {children}
                  </main>
                </CanvasProvider>
              </LoadingProvider>
            </GlobalProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}

