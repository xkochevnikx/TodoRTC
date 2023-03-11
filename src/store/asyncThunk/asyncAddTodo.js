import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../../globalAPI';
import { todoActions } from '../todoSlice';

export const asyncAddTodo = createAsyncThunk(
    'todos/asyncAddTodo',
    async function (newTodo, thunkAPI) {
        try {
            const response = await axios.post(API, newTodo);
            thunkAPI.dispatch(todoActions.addTodo(response.data));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
