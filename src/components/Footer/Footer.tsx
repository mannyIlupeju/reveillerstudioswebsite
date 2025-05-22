"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useGlobalContext } from '@/Context/GlobalContext'
import Newsletter from '../Newsletter/Newsletter'



export default function Footer() {

  const {timeState} = useGlobalContext();
  console.log(timeState.currentYear)

  return (
     
        <div className="flex flex-col md:flex-row gap-4 lg:gap-[20vw] lg:justify-center text-zinc-100 text-lg p-4 footer-section">
            <div className="flex flex-col md:flex-row gap-10 mt-4">
                <div className="flex flex-col lg:gap-8 w-[250px] h-[250px]">
                    <Image 
                    src='/images/footerlogo.PNG'
                    alt="footer logo"
                    width={250}
                    height={250}
                    />

                    <span className="text-sm">© {timeState.currentYear} Reveillerstudios</span>
                </div>

                <div className="flex flex-row lg:gap-8 w-max text-sm">
                    <div className="flex flex-col">
                        <Link href='/contact'className="footer-link">About</Link>
                        <Link href=''className="footer-link">Privacy policy</Link>
                    </div>
                    <div className="flex flex-col">
                        <Link href=''className="footer-link">Shipping</Link>
                        <Link href=''className="footer-link">Delivery & Returns</Link>
                    </div>
                        

                    <div className="flex flex-col lg:gap-3">
                        <Link href=''className="footer-link">Contact</Link>
                        <div>
                            <p>Connect with us!</p>
                        </div>
                        <ul className="flex gap-2">
                        <li>
                            <Image src="/images/tiktokpng.webp" alt="tiktok logo" width={30} height={30}/>
                        </li>
                        <li>
                            <Image src="/images/instagramlogo.webp" alt="instagram logo" width={30} height={30}/>
                        </li>
                        <li>
                            <Image src="/images/pinterestlogo.png" alt="pinterest logo" width={30} height={30}/>
                        </li>
                        </ul>
                    </div>

                </div>




            </div>

         

          <Newsletter/>
        </div>
   
     

  )
}
