import HooksContext from './HooksContext';
import React, { createContext, useContext, useState } from 'react';
import { Alert, Keyboard } from 'react-native';
import { BASE_URL } from '../config';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLoader } from '../features/loader';
import { setErrorMessage } from '../features/error';

const HelperMethodsContext = createContext();

export function HelperMethodsProvider({ children }) {
  const {
    user,
    taskList,
    setTaskList,
    setUser,
  } = useContext(HooksContext);
  const dispatch = useDispatch()

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

      setUser(response.data);
    } catch (error) {
      console.log(error.message);
      Alert.alert('An issue occured', error.message, [{
        text: 'Okay',
      }]);
      throw error;
    }
  };

  const clearAllData = () => {
    setTaskList([]);
    setTimeout(() => setUser({}), 550);
  };

  const fetchAllTodo = async () => {
    try {
      const apiSubDirectory = 'tasks';
      const url = `${BASE_URL}/${apiSubDirectory}/`;
      const response = await axios({
        method: 'GET',
        url,
        headers: {
          Userid: user.id,
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
      dispatch(setErrorMessage(error.message));
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

  const uploadTask = async (title, description) => {
    try {
      const apiSubDirectory = 'tasks';
      const url = `${BASE_URL}/${apiSubDirectory}/`;
      const response = await axios({
        method: 'POST',
        url,
        headers: {
          Userid: user.id,
        },
        data: {
          title: title,
          description: description,
        },
      });

      setTaskList([...taskList, createTodo(response.data)]);
    } catch (error) {
      console.log(error.message);
      Alert.alert('An issue occured', error.message, [{
        text: 'Okay',
      }]);
      throw error;
    }
  };

  const uploadUpdatedTask = async (id, title, description) => {
    try {
      const apiSubDirectory = 'tasks';
      const url = `${BASE_URL}/${apiSubDirectory}/${id}/`;
      await axios({
        method: 'PATCH',
        url,
        headers: {
          Userid: user.id,
        },
        data: {
          title: title,
          description: description,
        },
      });

      const currentTask = taskList.find(task => task.id === id);
      currentTask.title = title;
      currentTask.description = description;

      setTaskList([...taskList]);
    } catch (error) {
      console.log(error.message);
      Alert.alert('An issue occured', error.message, [{
        text: 'Okay',
      }]);
      throw error;
    }
  };

  const confimationWindow = (id, navigation) => {
    Alert.alert('Are you sure you want to delete this task', '', [
      {
        text: 'Confirm',
        style: "destructive",
        onPress: async () => {
          dispatch(setLoader(true));
          await deleteTask(id);
          navigation.pop();
          setTimeout(() => dispatch(setLoader(false)), 500);
        },
      },
      {
        text: 'Cancel',
      },
    ]);
  };

  const deleteTask = async id => {
    try {
      const apiSubDirectory = 'tasks';
      const url = `${BASE_URL}/${apiSubDirectory}/${id}/`;
      await axios({
        method: 'DELETE',
        url,
        headers: {
          Userid: user.id,
        },
      });

      setTaskList(taskList.filter(task => task.id !== id));
    } catch (error) {
      console.log(error.message);
      Alert.alert('An issue occured', error.message, [{
        text: 'Okay',
      }]);
      throw error;
    }
  };

  const toggleCompletion = async (id, status) => {
    try {
      const apiSubDirectory = 'tasks';
      const url = `${BASE_URL}/${apiSubDirectory}/${id}/`;
      await axios({
        method: 'PATCH',
        url,
        headers: {
          Userid: user.id,
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
      Alert.alert('An issue occured could not mark/unmark', error.message, [{
        text: 'Okay',
      }]);
    }
  };

  return (
    <HelperMethodsContext.Provider
      value={{
        getTodo,
        clearAllData,
        uploadTask,
        uploadUpdatedTask,
        confimationWindow,
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
