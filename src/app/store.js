import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from '../features/loader'
import errorReducer from '../features/error'
import userReducer from '../features/user'
import todoReducer from '../features/todo'

export default configureStore({
    reducer: {
        loader: loaderReducer,
        error: errorReducer,
        user: userReducer,
        todo: todoReducer,
    }
})