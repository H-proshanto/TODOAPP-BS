import { createContext, useState } from "react";
import { Alert, Keyboard } from "react-native";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [userName, setUserName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const getTitle = (id) => taskList[id].title;
  const getDescription = (id) => taskList[id].description;

  const getTime = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const clearAllData = () => {
    setTitle("");
    setDescription("");
    setTaskList([]);
  };

  const updateTaskList = () => {
    if (title === "") {
      setErrorMessage("The title field can not be empty");
      return false;
    }

    setTaskList([
      ...taskList,
      {
        title,
        description,
        status: "pending",
        id: taskList.length,
        timeStamp: getTime(),
      },
    ]);
    Keyboard.dismiss();

    return true;
  };

  const updateSpecificTask = (id) => {
    if (title === "") {
      setErrorMessage("The title field can not be empty");
      return false;
    }

    const newTasks = taskList.map((task) => {
      if (task.id === id) {
        task.title = title;
        task.description = description;
      }
      return task;
    });

    setTaskList(newTasks);
    Keyboard.dismiss();
    return true;
  };

  const toggleCompletion = (id) => {
    const newTasks = taskList.map((task) => {
      if (task.id === id) {
        task.status === "pending"
          ? (task.status = "done")
          : (task.status = "pending");
      }
      return task;
    });

    setTaskList(newTasks);
  };

  return (
    <DataContext.Provider
      value={{
        userName,
        setUserName,
        setTitle,
        setDescription,
        updateTaskList,
        taskList,
        clearAllData,
        toggleCompletion,
        getTitle,
        getDescription,
        title,
        description,
        updateSpecificTask,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
