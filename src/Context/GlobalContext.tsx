import React, { createContext, useContext, useState, ReactNode } from 'react';
import { removeItem } from '../../store/cartSlice';
import { useDispatch, UseDispatch } from 'react-redux';
import { cookies } from 'next/headers';

// Define the shape of your global state
type GlobalState = {
  currentTime: string;
  currentYear: string;
};

 type SelectedOption = {
    name: string;
    value: string;
  };

 type SizeInfo = {
    availableForSale: boolean;
    id: string;
    priceV2: {
      amount: string;
      currencyCode: string;
    };
    quantityAvailable: number;
    title: string;
    selectedOptions: SelectedOption[]; // This ensures selectedOptions is always an array
  };

  type CartId = {
    cartId: string;
   
  }

// Define the shape of the context, including state and update functions
type GlobalContextType = {
  cartId: string;
  setCartId:React.Dispatch<React.SetStateAction<string>>;
  timeState: GlobalState;
  setCurrentTime: (currentTime: string) => void;
  setCurrentYear: (currentYear:string) => void;
  removeCart: (id:string) => void
  // quantity: number;
  // setQuantity: (quantity:number) => void
  sizeInfo: SizeInfo;
  setSizeInfo:React.Dispatch<React.SetStateAction<SizeInfo>>;
  quantityAvailable: number | null;
  setQuantityAvailable: React.Dispatch<React.SetStateAction<number | null>>
  isHovered: boolean | null;
  setIsItemHovered: React.Dispatch<React.SetStateAction<boolean | null>>;
  isMenuOpen: boolean;
  setOpenMenu:  React.Dispatch<React.SetStateAction<boolean>>;

};







// Create the context with an initial value of `null`
const GlobalContext = createContext<GlobalContextType | null>(null);

// Define the provider props
type ProviderProps = {
  children: ReactNode;
};

// Context provider implementation
export const GlobalProvider: React.FC<ProviderProps> = ({ children }) => {
  const [cartId, setCartId] = useState<string>("")
  const [timeState, setState] = useState<GlobalState>({
    currentTime: '',
    currentYear:new Date().getFullYear().toString()
  });
  const [isHovered, setIsItemHovered] = useState<boolean | null>(null)
  const [isMenuOpen, setOpenMenu] = useState<boolean>(false)
  // const [quantity, setQuantity] = useState<number>(1)
  const [quantityAvailable, setQuantityAvailable] = useState<number | null>(null)
  const [sizeInfo, setSizeInfo] = useState<SizeInfo>({availableForSale:false, id:"", priceV2:{amount:"", currencyCode:""},quantityAvailable:0, title:"", selectedOptions:[]})
  const dispatch = useDispatch()






  

  const removeCart = (id:string) => {
    console.log("remove Item")
    dispatch(removeItem(id))



  }



  // Function to update the current time
  const setCurrentTime = (currentTime: string) => {
    setState((prevState) => ({ ...prevState, currentTime }));
  };

  const setCurrentYear = (currentYear: string) => {
    setState((prevState) => ({ ...prevState, currentYear }));
  };

  return (
    <GlobalContext.Provider 
      value={{ 
        cartId,
        setCartId,
        timeState, 
        setCurrentTime,
        setCurrentYear,
        isHovered,
        setIsItemHovered,
        isMenuOpen,
        setOpenMenu,
        removeCart,
        // quantity,
        // setQuantity, 
        sizeInfo,
        setSizeInfo,
        quantityAvailable, 
        setQuantityAvailable
      }}>
      {children}
    </GlobalContext.Provider>
  );
};



// Custom hook for consuming the context
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};