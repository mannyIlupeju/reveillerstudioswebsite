import {createSlice, PayloadAction} from '@reduxjs/toolkit'



interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  size: {
    name:string;
    value:string;
  };
  variantId: string;
}

interface CartState {
  cart: CartItem[];
  totalPrice: number;
  totalQuantity: number;
  isLoading: boolean;
  error: string | null;
}


const initialState:CartState = {
   cart: [],
   totalPrice: 0,
   totalQuantity: 0,
   isLoading: false,
   error: null


}

const calculateTotals = (state: CartState) => {
    state.totalQuantity = state.cart.reduce((total, item) => total + item.quantity, 0);
    state.totalPrice = state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItemIndex = state.cart.findIndex(
        item => item.variantId === action.payload.variantId
      );
      
      if (existingItemIndex >= 0) {
        state.cart[existingItemIndex].quantity += action.payload.quantity;
      } else {
        state.cart.push(action.payload);
      }
      calculateTotals(state);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter(item => item.variantId !== action.payload);
      calculateTotals(state);
    },
    updateQuantity: (state, action: PayloadAction<{ variantId: string; quantity: number }>) => {
      const item = state.cart.find(item => item.variantId === action.payload.variantId);
      if (item) {
        item.quantity = action.payload.quantity;
        calculateTotals(state);
      }
    },
    clearCart: (state) => {
      state.cart = [];
      calculateTotals(state);
    }
  }
});


export const { 
  addItem, 
  removeItem, 
  updateQuantity, 
  clearCart,
  setLoading,
  setError 
} = cartSlice.actions;

export default cartSlice.reducer;