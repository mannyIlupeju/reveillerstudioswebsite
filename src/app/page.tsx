'use client'

import React, {useEffect, ReactNode} from 'react'
import Loading from '@/components/Loading/Loading'
import { useLoading} from '@/Context/context/LoadingContext'
import Cursor from '@/components/Cursor/cursor'
// import Sketch from '@/components/Canvas/3dLanding'
import ThreeSketch from '@/components/Canvas/ThreeSketch'
import Navigation from '@/components/Navigation/Navigation'


export default function Home() {
  const {loading, setIsLoading} = useLoading();
  return (
    <>
      { !loading ? 
          (<Loading/>)
        :
          ( 
            <main className="flex items-center flex-col overflow-x-hidden overflow-y-hidden min-h-200">
            <ThreeSketch/>
            </main>   
           
          )
      }
    </>   
   )

}
