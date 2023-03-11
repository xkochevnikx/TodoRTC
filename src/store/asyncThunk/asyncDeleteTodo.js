import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../../globalAPI';
import { todoActions } from '../todoSlice';

export const asyncDeleteTodo = createAsyncThunk(
    'todos/asyncDeleteTodo',
    async function (id, thunkAPI) {
        try {
            await axios.delete(`${API}/${id}`);
            thunkAPI.dispatch(todoActions.deleteTodo(id));
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
