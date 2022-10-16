import React, { createContext, useState } from 'react';

const HooksContext = createContext();

export function HooksProvider({ children }) {
  const [user, setUser] = useState({});
  const [taskList, setTaskList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <HooksContext.Provider
      value={{
        user,
        taskList,
        errorMessage,
        isLoading,
        setUser,
        setTaskList,
        setErrorMessage,
        setIsLoading
      }}
    >
      {children}
    </HooksContext.Provider>
  );
}

export default HooksContext;
