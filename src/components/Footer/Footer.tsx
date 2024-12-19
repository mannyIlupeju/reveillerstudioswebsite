import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
     
        <div className="flex flex-col md:flex-row gap-4 text-zinc-100 text-lg justify-center p-12 footer-section">
            <div className="flex flex-col md:flex-row gap-20">
                <div className="flex flex-col lg:gap-8 md:gap-2">
               
                    <ul>
                        <Link href='/about'><li className="footer-link">About</li></Link>
                        <Link href='/privacy'><li className="footer-link">Privacy Policy</li></Link>
                    </ul>
                </div>

                <div className="flex flex-col lg:gap-8">
                    <div>
                        <p>Customer Service</p>
                    </div>
                    <ul >
                        <Link href='/contact'><li className="footer-link">Contact</li></Link>
                        <Link href=''><li className="footer-link">Track My Order</li></Link>
                        <Link href=''><li className="footer-link">Shipping & Returns</li></Link>
                    </ul>
                </div>

                <div className="flex flex-col lg:gap-8">
                    <div>
                        <p>Explore</p>
                    </div>
                    <ul>
                        <Link href='/shop'><li className="footer-link">Shop</li></Link>
                       
                    </ul>
                </div>

                <div className="flex flex-col lg:gap-8">
                    <div>
                        <p>Connect with Reveillerstudios</p>
                    </div>
                    <ul>
                       
                    </ul>
                </div>


            </div>

            <div className="lg:border md:border-0"></div>

            <div className="md:w-1/4 ">
                <div className="text-md">
                    <p>Subscribe to our newsletter</p>
                </div>
                <div className="flex flex-col lg:flex-row gap-4 mt-4 ">
                    <input type="email" id="email" placeholder="Enter email address" className="text-zinc-800 " />
                    <button className="text-md">SIGN UP</button>
                </div>
                <div>
                    {}
                </div>
                <div className="mt-12">
                    <p className="text-sm">
                        By clicking submit you agree to receive emails from Reveillerstudios
                        and accept our web terms of use and privacy and cookie apply.
                        Terms apply
                    </p>
                </div>
            </div>
        </div>
   
     

  )
}
