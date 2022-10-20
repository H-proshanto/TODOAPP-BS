import React, { createContext, useState } from 'react';

const HooksContext = createContext();

export function HooksProvider({ children }) {
  const [user, setUser] = useState({});
  const [taskList, setTaskList] = useState([]);

  return (
    <HooksContext.Provider
      value={{
        user,
        taskList,
        setUser,
        setTaskList,
      }}
    >
      {children}
    </HooksContext.Provider>
  );
}

export default HooksContext;
