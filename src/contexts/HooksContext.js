import React, { createContext, useState } from 'react';

const HooksContext = createContext();

export function HooksProvider({ children }) {
  const [user, setUser] = useState({});
  const [taskList, setTaskList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <HooksContext.Provider
      value={{
        user,
        taskList,
        errorMessage,
        setUser,
        setTaskList,
        setErrorMessage,
      }}
    >
      {children}
    </HooksContext.Provider>
  );
}

export default HooksContext;
