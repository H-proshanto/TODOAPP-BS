import { createContext, useState } from "react";
import { Alert, Keyboard } from "react-native";

const HooksContext = createContext();

export function HooksProvider({ children }) {
  const [key, setKey] = useState(0);
  const [userName, setUserName] = useState("");
  const [sessionName, setSessionName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <HooksContext.Provider
      value={{
        key,
        userName,
        sessionName,
        title,
        description,
        taskList,
        errorMessage,
        setKey,
        setUserName,
        setTitle,
        setSessionName,
        setDescription,
        setTaskList,
        setErrorMessage,
      }}
    >
      {children}
    </HooksContext.Provider>
  );
}

export default HooksContext;
