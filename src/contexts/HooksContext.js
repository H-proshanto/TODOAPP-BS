import { createContext, useState } from 'react';

const HooksContext = createContext();

export function HooksProvider({ children }) {
  const [key, setKey] = useState(0);
  const [userName, setUserName] = useState('');
  const [sessionName, setSessionName] = useState('');
  const [taskList, setTaskList] = useState(new Map());
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <HooksContext.Provider
      value={{
        key,
        userName,
        sessionName,
        taskList,
        errorMessage,
        setKey,
        setUserName,
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
