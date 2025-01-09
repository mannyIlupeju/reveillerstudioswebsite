import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of your global state
type GlobalState = {
  currentTime: string;
};

// Define the shape of the context, including state and update functions
type GlobalContextType = {
  timeState: GlobalState;
  setCurrentTime: (currentTime: string) => void;

};







// Create the context with an initial value of `null`
const GlobalContext = createContext<GlobalContextType | null>(null);

// Define the provider props
type ProviderProps = {
  children: ReactNode;
};

// Context provider implementation
export const GlobalProvider: React.FC<ProviderProps> = ({ children }) => {
  const [timeState, setState] = useState<GlobalState>({
    currentTime: '',
  });
  const [isHovered, setIsItemHovered] = useState(null)
  const [isMenuOpen, setOpenMenu] = useState(false)

  // Function to update the current time
  const setCurrentTime = (currentTime: string) => {
    setState((prevState) => ({ ...prevState, currentTime }));
  };

  return (
    <GlobalContext.Provider value={{ timeState, setCurrentTime }}>
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