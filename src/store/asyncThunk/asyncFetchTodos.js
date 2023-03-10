import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const asyncfetchTodos = createAsyncThunk(
    'todos/asyncfetchTodos',
    async function (_, thunkAPI) {
        try {
            const response = await axios('http://localhost:8000/todos');
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);
