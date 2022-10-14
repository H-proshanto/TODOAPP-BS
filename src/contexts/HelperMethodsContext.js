import HooksContext from './HooksContext';
import React, { createContext, useContext, useState } from 'react';
import { Alert, Keyboard } from 'react-native';
import { BASE_URL } from '../config';
import axios from 'axios';

const HelperMethodsContext = createContext();

export function HelperMethodsProvider({ children }) {
  const [key, setKey] = useState(0);
  const {
    taskList,
    sessionUserId,
    setSessionName,
    setTaskList,
    setErrorMessage,
    setSessionUserId,
  } = useContext(HooksContext);

  const getTodo = id => {
    const [todo] = taskList.filter(task => task.id === id);
    return todo;
  };

  const login = async userName => {
    try {
      const apiSubDirectory = 'login';
      const url = `${BASE_URL}/${apiSubDirectory}/`;
      const response = await axios({
        method: 'POST',
        url,
        data: {
          username: userName,
        },
      });
      const { username, id } = response.data;
      setSession(username, id);
    } catch (error) {
      console.log(error.message);
    }
  };

  const setSession = (userName, id) => {
    setSessionName(userName);
    setSessionUserId(id);
  };

  const clearAllData = () => {
    setTaskList([]);
  };

  const fetchAllTodo = async () => {
    try {
      const apiSubDirectory = 'tasks';
      const url = `${BASE_URL}/${apiSubDirectory}/`;
      const response = await axios({
        method: 'GET',
        url,
        headers: {
          Userid: sessionUserId,
        },
      });

      const currentTaskList = response.data;

      setTaskList(
        currentTaskList.map(task => {
          return createTodo(task);
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const createTodo = task => {
    return {
      title: task.title,
      description: task.description,
      status: task.is_completed ? 'done' : 'pending',
      id: task.id,
      timeStamp: task.created_at.slice(0, 10),
    };
  };

  const updateTaskList = (title, description) => {
    if (title === '') {
      setErrorMessage('The title field can not be empty');
      return false;
    }
    uploadTask(title, description);

    return true;
  };

  const uploadTask = async (title, description) => {
    try {
      const apiSubDirectory = 'tasks';
      const url = `${BASE_URL}/${apiSubDirectory}/`;
      await axios({
        method: 'POST',
        url,
        headers: {
          Userid: sessionUserId,
        },
        data: {
          title: title,
          description: description,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateSpecificTask = (id, title, description) => {
    if (title === '') {
      setErrorMessage('The title field can not be empty');
      return false;
    }

    uploadUpdatedTask(id, title, description);
    Keyboard.dismiss();
    return true;
  };

  const uploadUpdatedTask = async (id, title, description) => {
    try {
      const apiSubDirectory = 'tasks';
      const url = `${BASE_URL}/${apiSubDirectory}/${id}/`;
      await axios({
        method: 'PATCH',
        url,
        headers: {
          Userid: sessionUserId,
        },
        data: {
          title: title,
          description: description,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
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

  const toggleCompletion = async (id, status) => {
    try {
      const apiSubDirectory = 'tasks';
      const url = `${BASE_URL}/${apiSubDirectory}/${id}/`;
      await axios({
        method: 'PATCH',
        url,
        headers: {
          Userid: sessionUserId,
        },
        data: {
          is_completed: status === 'done' ? false : true,
        },
      });
      const task = taskList.find(task => task.id === id);
      task.status = status === 'done' ? 'pending' : 'done';
      setTaskList([...taskList]);
    } catch (error) {
      console.log(error.message);
    }
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
        login,
        fetchAllTodo,
      }}
    >
      {children}
    </HelperMethodsContext.Provider>
  );
}

export default HelperMethodsContext;
