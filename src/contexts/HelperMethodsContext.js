import HooksContext from './HooksContext';
import React, { createContext, useContext, useState } from 'react';
import { Alert, Keyboard } from 'react-native';

const HelperMethodsContext = createContext();

export function HelperMethodsProvider({ children }) {
  const [key, setKey] = useState(0);
  const { taskList, setUserName, setTaskList, setErrorMessage } =
    useContext(HooksContext);

  const getTodo = id => taskList.get(id);

  const getTime = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const clearAllData = () => {
    setUserName('');
    setTaskList(new Map());
  };

  const updateTaskList = (title, description) => {
    if (title === '') {
      setErrorMessage('The title field can not be empty');
      return false;
    }

    taskList.set(key, {
      title,
      description,
      status: 'pending',
      id: key,
      timeStamp: getTime(),
    });

    setTaskList(new Map(taskList));
    setKey(key + 1);
    Keyboard.dismiss();

    return true;
  };

  const updateSpecificTask = (id, title, description) => {
    if (title === '') {
      setErrorMessage('The title field can not be empty');
      return false;
    }

    taskList.get(id).title = title;
    taskList.get(id).description = description;
    setTaskList(new Map(taskList));
    Keyboard.dismiss();
    return true;
  };

  const deleteTask = (id, navigation) => {
    Alert.alert('Are you sure you want to delete this task', '', [
      {
        text: 'Confirm',
        onPress: () => {
          navigation.pop();
          taskList.delete(id);
          setTaskList(new Map(taskList));
        },
      },
      {
        text: 'Cancel',
      },
    ]);
  };

  const toggleCompletion = id => {
    const task = taskList.get(id);
    task.status =
      task.status === 'pending'
        ? (task.status = 'done')
        : (task.status = 'pending');
    setTaskList(new Map(taskList));
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
