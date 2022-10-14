import React, { createContext, useState } from 'react';

const HooksContext = createContext();

export function HooksProvider({ children }) {
  const [sessionName, setSessionName] = useState('');
  const [taskList, setTaskList] = useState(new Map());
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <HooksContext.Provider
      value={{
        sessionName,
        taskList,
        errorMessage,
        setSessionName,
        setTaskList,
        setErrorMessage,
      }}
    >
      {children}
    </HooksContext.Provider>
  );
}

export default HooksContext;
