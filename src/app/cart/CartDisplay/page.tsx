'use client'
import { useGlobalContext } from "@/Context/GlobalContext";
import Image from "next/image"
import { FaMinus, FaPlus } from 'react-icons/fa';
import {useSelector, useDispatch} from 'react-redux'
import { removeItem } from "../../../../store/cartSlice";
import {useEffect, useState} from 'react';

type LineEdge = {
    node: {

        attributes: {
            key: string,
            value: string,
        }[],
        id: string,
        merchandise: {
            id:string,
            image: {
                src: string,
                altText:null,
            },
            priceV2: {
                amount:string,
                currencyCode: string
            },
            product: {
                handle:string,
                vendor: string,
                title:string,  
            },
        },
        quantity: number
    }

}

interface CartProps {
  cart: {
    lines: {
      edges: LineEdge[]
    }
  }
}


export default function CartDisplay({cart}:CartProps){
    console.log(cart)
 
    const edges: LineEdge[] = cart.lines.edges
    console.log(edges.length)
    const [cartData, setCartData] = useState<CartProps | null>(null);
    const [cartId, setCartId] = useState<string | null>(null);
    const { quantityAvailable, removeCart} = useGlobalContext()
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchCartId(){
            const response = await fetch("/api/get-cart-id");
            const data = await response.json()
            setCartId(data.cartId);
        }
        fetchCartId();
    }, []);

    console.log(cartId)


    async function removeCartItem(itemsId:string, cartId:string){
        console.log(itemsId, cartId)
        try {
             dispatch((removeItem(itemsId)))
             
            const response = await fetch('/api/shopifyCart/removeItem', {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    cartId,
                    lineId: itemsId
                }),
            });
                
        

            
            if(!response.ok){
                throw new Error('Failed to remove item from Cart')
            }

           
        
            
            
        }  catch(error){
             console.error('Error removing item from cart:', error);
        }

    }

    
    
    return (
        <main className="flex flex-col gap-10">
            {edges.length > 0 ? 
            <>
                {edges.map((edge) => {
                    console.log(edge.node)
                    const items = edge.node
                    console.log(items.id)
                    const sizeValue = items.attributes.find(attr => attr.key === 'Size')?.value;
                    const {merchandise, quantity} = items
                    return (
                        <div
                        key={items.id}
                        className='flex flex-row gap-6'
                        >
                        <Image
                        src={merchandise.image.src}
                        width={150}
                        height={150}
                        priority
                        alt={merchandise.product.title}
                        />

                        <div>
                        <h1>{merchandise.product.title}</h1>
                        <p>
                            Price: {merchandise.priceV2.amount}
                            {merchandise.priceV2.currencyCode}
                        </p>
                        <p>Size: {sizeValue}</p>
                        <div className='flex gap-10 w-fit mt-2'>
                            <FaMinus
                            className='flex self-center'
                           
                            />
                            <span className='font-bold text-lg bg-gray-200 p-2'>
                            {quantity}
                            </span>
                            <FaPlus
                            className='flex self-center'
                          
                            />
                        </div>
                        <button onClick={()=> {
                            if(cartId){
                                removeCartItem(items.id, cartId)
                            } else {
                                console.error("Cart ID is undefined")
                            }
                        }}>
                        Remove
                        </button>
                        </div>
                    </div>
                    );
                })} 
                </>
                :
                <div className="flex justify-center h-screen">
                    <h1>Cart is empty</h1>
                </div>
            }

            </main>

    )
}