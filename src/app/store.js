import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from '../features/loader'

export default configureStore({
    reducer: {
        loader: loaderReducer
    }
})