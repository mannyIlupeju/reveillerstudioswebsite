'use client'

import React, {useContext} from 'react'

import Navigation from '@/components/Navigation/Navigation'
import Footer from '@/components/Footer/Footer'
import { LoadingProvider } from '@/Context/context/LoadingContext';
import { CanvasProvider } from '@/Context/context/CanvasContext';
import { GlobalProvider } from '@/Context/GlobalContext';
<<<<<<< HEAD
=======
import {Provider} from 'react-redux'
import { store, persistor } from '../../store/store';
import { PersistGate } from 'redux-persist/integration/react';
>>>>>>> origin/main
import type { Metadata } from "next";

import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
<<<<<<< HEAD
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
=======
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

>>>>>>> origin/main
