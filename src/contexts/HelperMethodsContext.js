import HooksContext from './HooksContext';
import React, { createContext, useContext, useState } from 'react';
import { Alert, Keyboard } from 'react-native';
import { BASE_URL } from '../config';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../features/loader';
import { setErrorMessage } from '../features/error';
import { deleteTask } from '../features/todo';

const HelperMethodsContext = createContext();

export function HelperMethodsProvider({ children }) {
  const { taskList } = useSelector(state => state.todo);
  const dispatch = useDispatch()

  const getTodo = id => {
    const todo = taskList.find(task => task.id === id);
    return todo;
  };

  const clearAllData = () => {
    setTimeout(() => setUser({}), 550);
  };






  const confimationWindow = (userId, taskId, navigation) => {
    Alert.alert('Are you sure you want to delete this task', '', [
      {
        text: 'Confirm',
        style: "destructive",
        onPress: async () => {
          // dispatch(setLoader(true));
          dispatch(deleteTask({ taskId, userId }))
          navigation.pop();
          // setTimeout(() => dispatch(setLoader(false)), 500);
        },
      },
      {
        text: 'Cancel',
      },
    ]);
  };

  return (
    <HelperMethodsContext.Provider
      value={{
        getTodo,
        clearAllData,
        confimationWindow,
      }}
    >
      {children}
    </HelperMethodsContext.Provider>
  );
}

export default HelperMethodsContext;
