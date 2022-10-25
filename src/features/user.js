import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../config';
import axios from 'axios';

const initialState = {
  status: 'idle',
  isLoggedIn: false,
  info: {
    id: null,
    username: '',
    email: ''
  },
  error: '',
};

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
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: () => initialState,
    resetStatus: state => {
      return { ...state, status: 'idle' };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.status = 'running';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.info = action.payload;
        state.error = '';
        state.isLoggedIn = true;
        state.status = 'resolved';
      })
      .addCase(login.rejected, (state, action) => {
        state.info = {};
        state.error = action.error?.message;
        state.isLoggedIn = false;
        state.status = 'error';
      });
  },
});

export const { logout, resetStatus } = userSlice.actions;
export default userSlice.reducer;
