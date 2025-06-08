'use client'

import React, {useState, useEffect } from 'react'
import Navigation from '@/components/Navigation/Navigation'
import Footer from '@/components/Footer/Footer'
import AppProviders from './Providers/route'
import LayoutWithCart from './layoutWithCart'

import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  


  return (

     <html lang="en">
      <body>
      <AppProviders> 
        <LayoutWithCart>
          {children}
        </LayoutWithCart>
        </AppProviders>
        
      </body>
    </html>
    
  );
}

