import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { todoActions } from '../todoSlice';

export const asyncEditTodo = createAsyncThunk(
    'todos/asyncEditTodos',
    async function (id, thunkAPI) {
        try {
            const response = await axios(`http://localhost:8000/todos/${id}`);
            thunkAPI.dispatch(todoActions.editTodo(response.data));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);
