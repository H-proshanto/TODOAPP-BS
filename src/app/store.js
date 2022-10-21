import { configureStore } from '@reduxjs/toolkit';
import errorReducer from '../features/error';
import userReducer from '../features/user';
import todoReducer from '../features/todo';

export default configureStore({
  reducer: {
    error: errorReducer,
    user: userReducer,
    todo: todoReducer,
  },
});
