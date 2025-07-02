import Image from 'next/image'
import { useState } from 'react'

export default function ProductImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="w-full flex justify-center items-center">
      {!loaded && (
        <div className="w-[500px] h-[500px] bg-gray-300 animate-pulse rounded-md" />
      )}
      <Image
        src={src}
        alt={alt}
        width={500}
        height={500}
        onLoadingComplete={() => setLoaded(true)}
        className={`${loaded ? 'block' : 'hidden'} object-contain`}
      />
    </div>
  )
}