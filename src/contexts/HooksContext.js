import React, { createContext, useState } from 'react';

const HooksContext = createContext();

export function HooksProvider({ children }) {

  return (
    <HooksContext.Provider
      value={{
      }}
    >
      {children}
    </HooksContext.Provider>
  );
}

export default HooksContext;
