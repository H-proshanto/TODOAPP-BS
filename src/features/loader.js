import { createSlice } from '@reduxjs/toolkit'

export const loaderSlice = createSlice({
    name: 'loader',
    initialState: {
        value: false,
    },
    reducers: {
        setLoader: (state, params) => {
            const { payload } = params;
            return { ...state, value: payload };
        }
    }
})

export const { setLoader } = loaderSlice.actions;

export default loaderSlice.reducer