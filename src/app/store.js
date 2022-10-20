import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from '../features/loader'
import errorReducer from '../features/error'

export default configureStore({
    reducer: {
        loader: loaderReducer,
        error: errorReducer,
    }
})