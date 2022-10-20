import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../config';
import axios from 'axios';

const initialState = {
    status: 'idle',
    taskList: [],
    error: '',
}


export const fetchAllTodo = createAsyncThunk('todo/fetchAllTodo', async (id) => {
    const apiSubDirectory = 'tasks';
    const url = `${BASE_URL}/${apiSubDirectory}/`;
    const response = await axios({
        method: 'GET',
        url,
        headers: {
            Userid: id,
        },
    });

    return response.data;
});

export const uploadTask = createAsyncThunk('todo/uploadTask', async params => {
    const apiSubDirectory = 'tasks';
    const url = `${BASE_URL}/${apiSubDirectory}/`;
    const response = await axios({
        method: 'POST',
        url,
        headers: {
            Userid: params.userId,
        },
        data: {
            title: params.title,
            description: params.description,
        },
    });

    return response.data;
});

export const uploadUpdatedTask = createAsyncThunk('todo/uploadUpdatedTask', async params => {
    const apiSubDirectory = 'tasks';
    const url = `${BASE_URL}/${apiSubDirectory}/${params.taskId}/`;
    const response = await axios({
        method: 'PATCH',
        url,
        headers: {
            Userid: params.userId,
        },
        data: {
            title: params.title,
            description: params.description,
        },
    });

    return response.data;
});

export const deleteTask = createAsyncThunk('todo/deleteTask', async params => {
    const apiSubDirectory = 'tasks';
    const url = `${BASE_URL}/${apiSubDirectory}/${params.taskId}/`;
    await axios({
        method: 'DELETE',
        url,
        headers: {
            Userid: params.userId,
        },
    });

    return params;
});

export const toggleCompletion = createAsyncThunk('todo/toggleCompletion', async params => {
    const apiSubDirectory = 'tasks';
    const url = `${BASE_URL}/${apiSubDirectory}/${params.taskId}/`;
    const response = await axios({
        method: 'PATCH',
        url,
        headers: {
            Userid: params.userId,
        },
        data: {
            is_completed: !params.status,
        },
    });

    return response.data;
});

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        clearList: () => initialState
    },
    extraReducers: builder => {
        builder
            .addCase(fetchAllTodo.pending, (state) => {
                state.status = 'running'
            })
            .addCase(fetchAllTodo.fulfilled, (state, action) => {
                state.taskList = action.payload;
                state.error = '';
                state.status = 'resolved'
            })
            .addCase(fetchAllTodo.rejected, (state, action) => {
                state.taskList = {};
                state.error = action.error.message;
                state.status = 'error';
            })
            .addCase(uploadTask.pending, (state) => {
                state.status = 'running'
            })
            .addCase(uploadTask.fulfilled, (state, action) => {
                state.taskList = [...state.taskList, action.payload];
                state.error = '';
                state.status = 'resolved'
            })
            .addCase(uploadTask.rejected, (state, action) => {
                state.taskList = {};
                state.error = action.error.message;
                state.status = 'error';
            })
            .addCase(toggleCompletion.pending, (state) => {
                state.status = 'running'
            })
            .addCase(toggleCompletion.fulfilled, (state, action) => {
                const task = state.taskList.find(task => task.id === action.payload.id);
                task.is_completed = action.payload.is_completed;
                state.error = '';
                state.status = 'resolved'
            })
            .addCase(toggleCompletion.rejected, (state, action) => {
                state.taskList = {};
                state.error = action.error.message;
                state.status = 'error';
            })
            .addCase(uploadUpdatedTask.pending, (state) => {
                state.status = 'running'
            })
            .addCase(uploadUpdatedTask.fulfilled, (state, action) => {
                const task = state.taskList.find(task => task.id === action.payload.id);
                task.title = action.payload.title;
                task.description = action.payload.description;
                state.error = '';
                state.status = 'resolved'
            })
            .addCase(uploadUpdatedTask.rejected, (state, action) => {
                state.taskList = {};
                state.error = action.error.message;
                state.status = 'error';
            })
            .addCase(deleteTask.pending, (state) => {
                state.status = 'running'
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.taskList = state.taskList.filter(task => task.id !== action.payload.taskId)
                state.error = '';
                state.status = 'resolved'
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.taskList = {};
                state.error = action.error.message;
                state.status = 'error';
            })
    }
})

export const { clearList } = todoSlice.actions;
export default todoSlice.reducer

// } catch (error) {
//     console.log(error.message);
//     dispatch(setErrorMessage(error.message));
//   }