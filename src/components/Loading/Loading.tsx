'use client'

import React, {useState, useEffect, useRef} from 'react'
import Image from 'next/image'
import { useLoading } from '@/Context/context/LoadingContext'
import { gsap } from "gsap"
import { useGSAP } from '@gsap/react'



const Loading:React.FC = () => {
    const {setIsLoading} = useLoading()
    const [counter, setCounter] = useState(0)
    const [canEnter, setCanEnter] = useState(false); // Track if 12 seconds have passed
    const counterRef = useRef({ value: counter })
    const counterElementRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Ensure the "Enter" button appears only after 12 seconds
        const enterTimeout = setTimeout(() => {
            setCanEnter(true);
        }, 12000); // 12 seconds

        const updateCounter = () => {
            const increment = Math.floor(Math.random() * 10) + 1;
            const newCounter = counterRef.current.value + increment > 100 ? 100 : counterRef.current.value + increment;

            gsap.to(counterRef.current, {
                duration: 0.5,
                value: newCounter,
                onUpdate: function () {
                    setCounter(Math.floor(counterRef.current.value));
                },
            });

            counterRef.current.value = newCounter;

            if (counterRef.current.value < 100) {
                setTimeout(updateCounter, Math.floor(Math.random() * 200) + 50);
            }
        };

        updateCounter();

        return () => clearTimeout(enterTimeout); // Cleanup timeout on unmount
    }, []);

    
  return (
    <div className="bg-black fixed z-2 flex h-screen w-screen text-white">
        <div className="p-12">
            <span className="text-9xl">Reveillerstudios</span>
            <div className="flex justify-between gap-2 p-2">
                <div className="w-96 text-sm">
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer 
                        took a galley of type and scrambled it to make a type specimen book.
                    </p>
                </div>
                <div>
                    <div className="flex justify-items-end gap-2">
                    
                        <Image src='/images/footerlogo.png' alt="Loading artwork of Reveillerstudios logo" width={200} height={200}/>
                        <div ref={counterElementRef} className="counter">{Math.floor(counter)}%</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Loading;
