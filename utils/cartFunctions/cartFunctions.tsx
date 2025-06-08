'use client'

import { useGlobalContext } from "@/Context/GlobalContext";
import Image from "next/image"
import { FaMinus, FaPlus } from 'react-icons/fa';
import {useSelector, useDispatch} from 'react-redux'
import { removeItem, setLoading, updateQuantity, setCartItems, setError } from "../../store/cartSlice";
import {useEffect, useState} from 'react';
import { RootState } from "../../store/store";
import {Dispatch} from "redux"




  
export async function removeCartItem(itemId: string, cartId: string, dispatch:Dispatch) {
 
  if(!cartId) return;

  try {
    const response = await fetch("/api/shopifyCart/removeItem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cartId,
        lineId: itemId,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to remove item from cart");
    }

    // Refresh cart after successful removal
    await refreshCart(cartId, dispatch);
  } catch (error) {
    console.error("Error removing item from cart:", error);
    await refreshCart(cartId, dispatch); // Refresh to ensure UI is in sync
  } 
}

export async function updateCartQty(lineId: string, cartId:string | null, quantity: number, dispatch:Dispatch) {
  if (!cartId) return;

  try {
   
    dispatch(setLoading(true));

    // Optimistically update UI
    dispatch(updateQuantity({ lineId, quantity }));

    const response = await fetch("/api/shopifyCart/updateQtyCart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cartId,
        lineId,
        quantity,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update quantity");
    }

    // Refresh cart data
    await refreshCart(cartId, dispatch);
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    await refreshCart(cartId, dispatch); // Refresh to revert to server state if there was an error
  } finally {
    dispatch(setLoading(false));
  }
}

export async function refreshCart(cartId: string, dispatch:Dispatch) {
  
  if (!cartId) return;

  try {
    const response = await fetch("/api/shopifyCart/fetchCart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartId }),
    });

    console.log(response)

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch updated cart");
    }

    const updatedCart = await response.json();
    console.log("Updated cart data:", updatedCart); // For debugging

    if (updatedCart?.cart?.lines?.edges) {
      const mappedItems = updatedCart.cart.lines.edges.map((edge) => ({
        id: edge.node.id,
        quantity: edge.node.quantity,
        title: edge.node.merchandise.product.title,
        price: Number(edge.node.merchandise.priceV2.amount),
        currencyCode: edge.node.merchandise.priceV2.currencyCode,
        image: edge.node.merchandise.image.src,
        size: {
          name: "Size",
          value:
            edge.node.attributes.find((attr) => attr.key === "Size")?.value ||
            "",
        },
        variantId: edge.node.merchandise.id,
        merchandise: edge.node.merchandise,
        attributes: edge.node.attributes,
      }));
      dispatch(setCartItems(mappedItems));
    }
  } catch (error) {
    console.error("Error refreshing cart:", error);
    dispatch(setError("Failed to refresh cart"));
  }
}

export async function handleCheckout(cartId: string | null) {
  if (!cartId) return;

  try {
    const response = await fetch("api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartId }),
    });

    const data = await response.json();
    const fetchedData = data;
    if (fetchedData.data.cart) {
      window.location.href = fetchedData.data.cart.checkoutUrl;
    }
  } catch (error) {
    console.error("Error checking items out:", error);
  }
}