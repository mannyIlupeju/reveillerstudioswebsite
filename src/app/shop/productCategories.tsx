'use client'

import React, {useState} from 'react'
import Link from 'next/link'


type Collection = {
  id: string;
  title: string;
  handle: string;
  updatedAt: string;
}

type Props = {
    collections: Collection[]
}





function ProductCategories({ collections }: Props) {
  
  
  const breakdownCollections = collections.map((item)=> item.node)
  console.log(breakdownCollections)
  

  // const [name, setName] = useState<string[]>(titleArray)
  const [name, setName] = useState(null)
  const [reveresedID, setReversedID] = useState<string | null>(null);
  const[reversedTitle, setReversedTitle] = useState<string | null>(null)
  const [hoveredID, setHoveredID] = useState<string | null>(null);
  const [intervalID, setIntervalID] = useState<NodeJS.Timeout | null>(null)

  


  function handleMouseEnter(e:React.MouseEvent<HTMLAnchorElement>, id:string, title:string){
    e.preventDefault();

    const element = e.currentTarget
    const originalText = title
  
    element.setAttribute("data-original-text", originalText)


    const idInterval = setInterval(() => {
      setReversedTitle((prev) => prev === originalText ? originalText.split("").reverse().join("") : originalText)
    }, 500);

    setHoveredID(id);
    setIntervalID(idInterval);
  };

  const handleMouseLeave= () => {
    if(intervalID){
      clearInterval(intervalID)
      setIntervalID(null)
    }
    setHoveredID(null);
    setReversedTitle(null)
  }

  return (
      <aside className="lg:p-4">
        <div className = "flex xl:flex-col justify-center mt-12 flex-row gap-5">
        {breakdownCollections.map((item:any) => {
          const{id, title, handle} = item;

            return (
                <Link 
                key={id} 
                href={`/shop/collections/${handle}`} 
                className= "hover:text-yellow-600 text-zinc-800"
                data-original-text={title}
                onMouseEnter={(e) => handleMouseEnter(e, id, title)}
                onMouseLeave={handleMouseLeave}
                >
                  <span className="font-semibold uppercase">
                    {hoveredID === id && reversedTitle ? reversedTitle : title}
                  </span>
                </Link>
            )
        })}
        </div>
      </aside>
  )
}




export default ProductCategories