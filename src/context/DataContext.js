import { createContext, useState } from "react";
import { Alert, Keyboard } from "react-native";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [userName, setUserName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getTitle = (id) => taskList[id].title;
  const getDescription = (id) => taskList[id].description;

  const clearAllData = () => {
    setUserName("");
    setTitle("");
    setDescription("");
    setTaskList([]);
  };

  const updateTaskList = () => {
    if (title === "") {
      Alert.alert("Title field can't be empty");
      return false;
    }

    setTaskList([
      ...taskList,
      { title, description, status: "pending", id: taskList.length },
    ]);
    Keyboard.dismiss();

    return true;
  };

  const updateSpecificTask = (id) => {
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

  const authUser = () => {
    if (userName === "") {
      Alert.alert("The Field is Empty");
      return false;
    } else if (userName.length > 7) {
      Alert.alert("Max length allowed: 7");
      return false;
    }
    return true;
  };

  return (
    <DataContext.Provider
      value={{
        userName,
        setUserName,
        authUser,
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
        setIsLoggedIn,
        isLoggedIn,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
