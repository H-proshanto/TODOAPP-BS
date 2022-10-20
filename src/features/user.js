import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../config';
import axios from 'axios';

const initialState = {
    loading: false,
    status: 'idle',
    user: {},
    error: '',
}

export const login = createAsyncThunk('user/login', async userName => {
    const apiSubDirectory = 'login';
    const url = `${BASE_URL}/${apiSubDirectory}/`;
    const response = await axios({
        method: 'POST',
        url,
        data: {
            username: userName,
        },
    });

    return response.data;
})


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: () => initialState,
    },
    extraReducers: builder => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.status = 'running'
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = '';
                state.status = 'resolved'
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.user = {};
                state.error = action.error.message;
                state.status = 'error';
            })
    }
})

export const { logout } = userSlice.actions;
export default userSlice.reducer
