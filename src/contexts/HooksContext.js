import React, { createContext, useState } from 'react';

const HooksContext = createContext();

export function HooksProvider({ children }) {
  const [sessionName, setSessionName] = useState('');
  const [sessionUserId, setSessionUserId] = useState(NaN);
  const [taskList, setTaskList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <HooksContext.Provider
      value={{
        sessionName,
        taskList,
        errorMessage,
        sessionUserId,
        setSessionName,
        setTaskList,
        setErrorMessage,
        setSessionUserId,
      }}
    >
      {children}
    </HooksContext.Provider>
  );
}

export default HooksContext;
