import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { todoActions } from '../todoSlice';

export const asyncAddTodo = createAsyncThunk(
    'todos/asyncAddTodo',
    async function (newTodo, thunkAPI) {
        try {
            const response = await axios.post(`http://localhost:8000/todos`, newTodo);
            thunkAPI.dispatch(todoActions.addTodo(response.data));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
