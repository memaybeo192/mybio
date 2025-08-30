// app/context/DeviceContext.js
"use client";

import { createContext, useContext } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

const DeviceContext = createContext(false);

export const DeviceProvider = ({ children }) => {
  const isMobile = useIsMobile();
  return (
    <DeviceContext.Provider value={isMobile}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDevice = () => useContext(DeviceContext);