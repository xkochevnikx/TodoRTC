import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../../globalAPI';

export const asyncAddEditTodo = createAsyncThunk(
    'todos/asyncAddEditTodos',
    async function ({ id, newEditTodo }, thunkAPI) {
        try {
            await axios.patch(`${API}/${id}`, newEditTodo);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);
