"use client";


import { useGlobalContext } from "@/Context/GlobalContext";
import Image from "next/image"
import { FaMinus, FaPlus } from 'react-icons/fa';
import {useSelector, useDispatch} from 'react-redux'
import { removeItem, setLoading, updateQuantity, setCartItems, setError } from "../../../../store/cartSlice";
import {useEffect, useState} from 'react';
import { RootState } from "../../../../store/store";

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
   
    const [cartData, setCartData] = useState<CartProps | null>(null);
    const [cartId, setCartId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { quantityAvailable, removeCart} = useGlobalContext()
    const dispatch = useDispatch();

    const cartItems = useSelector((state: RootState) => state.cart.cart);
    console.log(cartItems)

    const cartTotal = cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
    },0).toFixed(2)
    
    


   useEffect(() => {
    console.log("Cart UI Re-rendering with new items:", cartItems);
   }, [cartItems]);
  

``
    useEffect(() => {
        if(cart?.lines.edges) {
            const cartItems = cart.lines.edges.map(edge => ({
                id: edge.node.id,
                quantity: edge.node.quantity,
                title: edge.node.merchandise.product.title,
                price: Number(edge.node.merchandise.priceV2.amount),
                currencyCode: edge.node.merchandise.priceV2.currencyCode, // Add this
                image: edge.node.merchandise.image.src,
                size: {
                    name: 'Size',
                    value: edge.node.attributes.find(attr => attr.key === 'Size')?.value || ''
                },
                variantId: edge.node.merchandise.id,
                merchandise: {
                    id: edge.node.merchandise.id,
                    image: {
                        src: edge.node.merchandise.image.src,
                        altText: edge.node.merchandise.image.altText
                    },
                    priceV2: {
                        amount: Number(edge.node.merchandise.priceV2.amount),
                        currencyCode: edge.node.merchandise.priceV2.currencyCode
                    },
                    product: {
                        title: edge.node.merchandise.product.title,
                        handle: edge.node.merchandise.product.handle,
                        vendor: edge.node.merchandise.product.vendor
                    }
                },
                attributes: edge.node.attributes
            }));
            dispatch(setCartItems(cartItems));
        }
    }, [cart, dispatch]);

    useEffect(() => {
        async function fetchCartId(){
            const response = await fetch("/api/get-cart-id");
            const data = await response.json()
            setCartId(data.cartId);
        }
        fetchCartId();
    }, []);


   async function removeCartItem(itemId: string, cartId: string) {
        try {
            setIsLoading(true);

            const response = await fetch('/api/shopifyCart/removeItem', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cartId,
                    lineId: itemId
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to remove item from cart');
            }

            // Refresh cart after successful removal
            await refreshCart(cartId);

        } catch (error) {
            console.error('Error removing item from cart:', error);
            await refreshCart(cartId); // Refresh to ensure UI is in sync
        } finally {
            setIsLoading(false);
        }
    }

    async function updateCartQty(lineId: string, quantity: number) {
            if (!cartId) return;

            try {
                setIsLoading(true);
                dispatch(setLoading(true));

                // Optimistically update UI
                dispatch(updateQuantity({lineId, quantity }));

                const response = await fetch('/api/shopifyCart/updateQtyCart', {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        cartId,
                        lineId,
                        quantity
                    })
                });

                if (!response.ok) {
                    throw new Error('Failed to update quantity');
                }

                // Refresh cart data
                await refreshCart(cartId);

            } catch (error) {
                console.error('Error updating cart quantity:', error);
                await refreshCart(cartId); // Refresh to revert to server state if there was an error
            } finally {
                setIsLoading(false);
                dispatch(setLoading(false));
            }
        }

    async function refreshCart(cartId: string) {
            if (!cartId) return;
            
            try {
                const response = await fetch(`/api/shopifyCart/fetchCart`, {
                    method: 'POST',
                    headers: {"Content-Type": 'application/json'},
                    body: JSON.stringify({cartId})
                });
                
                if (!response.ok) {
                    let errorData;
                    try {
                        errorData = await response.json();
                    } catch {
                        errorData = { message: 'Unknown error' };
                    }
                    throw new Error(errorData.message || 'Failed to fetch updated cart');
                }

                const updatedCart = await response.json();
                console.log('Updated cart data:', updatedCart); // For debugging

                if (updatedCart?.cart?.lines?.edges && Array.isArray(updatedCart.cart.lines.edges)) {
                    const mappedItems = (updatedCart.cart.lines.edges as LineEdge[]).map(edge => ({
                        id: edge.node.id,
                        quantity: edge.node.quantity,
                        title: edge.node.merchandise.product.title,
                        price: Number(edge.node.merchandise.priceV2.amount),
                        currencyCode: edge.node.merchandise.priceV2.currencyCode,
                        image: edge.node.merchandise.image.src,
                        size: {
                            name: 'Size',
                            value: edge.node.attributes.find(attr => attr.key === 'Size')?.value || ''
                        },
                        variantId: edge.node.merchandise.id,
                        merchandise: {
                            id: edge.node.merchandise.id,
                            image: {
                                src: edge.node.merchandise.image.src,
                                altText: edge.node.merchandise.image.altText
                            },
                            priceV2: {
                                amount: Number(edge.node.merchandise.priceV2.amount), // <-- FIXED
                                currencyCode: edge.node.merchandise.priceV2.currencyCode
                            },
                            product: {
                                title: edge.node.merchandise.product.title,
                                handle: edge.node.merchandise.product.handle,
                                vendor: edge.node.merchandise.product.vendor
                            }
                        },
                        attributes: edge.node.attributes
                    }));
                    dispatch(setCartItems(mappedItems));
                } else {
                    dispatch(setCartItems([])); // Clear cart if no items
                }
            } catch (error) {
                console.error('Error refreshing cart:', error);
                dispatch(setError('Failed to refresh cart'));
            }
        }

    
        async function handleCheckout(cartId:string | null){
            if(!cartId) return;

            try{
                const response = await fetch('api/checkout', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({cartId})
                })

                const data = await response.json();
                const fetchedData = data;
                if(fetchedData.data.cart) {
                    window.location.href = fetchedData.data.cart.checkoutUrl
                }
                

            }catch(error){
                console.error("Error checking items out:", error)
            }
        }
    
    
     return (
        <main className="flex flex-col gap-10 mx-auto p-4">
            {cartItems.length > 0 ? (
                <>
                    {cartItems.map((item) => (
                        <div key={item.id}
                            className='flex flex-row gap-4'
                        >
                            <Image
                                src={item.image}
                                width={250}
                                height={250}
                                priority
                                alt={item.title}
                            />

                            <div className="flex flex-col justify-center">
                                <h1>{item.title}</h1>
                                <p> Price: {Number.parseFloat(Number(item.price * item.quantity).toFixed(2))}
                                     {item.currencyCode}
                                </p>
                                <p>Size: {item.size.value}</p>
                                <p className='font-bold text-lg'>
                                    Quantity:  {item.quantity}
                                </p>
                                <div className='flex  w-fit mt-2'>
                                    <button 
                                        className='disabled:opacity-50'
                                        onClick={() => updateCartQty(item.id, Math.max(0, item.quantity - 1))}
                                    >
                                        <FaMinus className='flex self-center' />
                                    </button>
                                    <button
                                        className="p-2 hover:bg-gray-100 rounded"
                                        onClick={() => updateCartQty(item.id, item.quantity + 1)}
                                    >
                                        <FaPlus className="w-4 h-4" />
                                    </button>
                                </div>
                                <button 
                                    onClick={() => cartId && removeCartItem(item.id, cartId)}
                                    className="flex items-start mt-2  py-2 text-zinc-800 rounded  hover:underline"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}

                    <p className="text-xl">Grand Total: {cartTotal} {cartItems[0]?.currencyCode || ''} </p>

                    <button 
                    className="bg-zinc-800 w-fit text-white p-4 mx-auto"
                    onClick={() => handleCheckout(cartId)}
                    >
                        Continue to Checkout
                    </button>
                </>
            ) : (
                <div className="flex justify-center">
                    <h1>Cart is empty</h1>
                </div>
            )}
        </main>
    );
}