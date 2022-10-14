import HooksContext from './HooksContext';
import React, { createContext, useContext, useState } from 'react';
import { Alert, Keyboard } from 'react-native';

const HelperMethodsContext = createContext();

export function HelperMethodsProvider({ children }) {
  const [key, setKey] = useState(0);
  const { taskList, setTaskList, setErrorMessage } = useContext(HooksContext);

  const getTodo = id => {
    const [todo] = taskList.filter(task => task.id === id);
    return todo;
  };

  const getTime = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const clearAllData = () => {
    setTaskList([]);
  };

  const updateTaskList = (title, description) => {
    if (title === '') {
      setErrorMessage('The title field can not be empty');
      return false;
    }

    setTaskList([
      ...taskList,
      {
        title,
        description,
        status: 'pending',
        id: key,
        timeStamp: getTime(),
      },
    ]);
    setKey(key + 1);
    Keyboard.dismiss();

    return true;
  };

  const updateSpecificTask = (id, title, description) => {
    if (title === '') {
      setErrorMessage('The title field can not be empty');
      return false;
    }

    const currentTask = taskList.find(task => task.id === id);
    currentTask.title = title;
    currentTask.description = description;

    setTaskList([...taskList]);
    Keyboard.dismiss();
    return true;
  };

  const deleteTask = (id, navigation) => {
    Alert.alert('Are you sure you want to delete this task', '', [
      {
        text: 'Confirm',
        onPress: () => {
          navigation.pop();
          setTaskList(taskList.filter(task => task.id !== id));
        },
      },
      {
        text: 'Cancel',
      },
    ]);
  };

  const toggleCompletion = id => {
    const currentTask = taskList.find(task => task.id === id);
    const { status } = currentTask;
    currentTask.status = status === 'pending' ? 'done' : 'pending';
    setTaskList([...taskList]);
  };

  return (
    <HelperMethodsContext.Provider
      value={{
        getTodo,
        clearAllData,
        updateTaskList,
        updateSpecificTask,
        deleteTask,
        toggleCompletion,
      }}
    >
      {children}
    </HelperMethodsContext.Provider>
  );
}

export default HelperMethodsContext;
