import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../../globalAPI';
import { todoActions } from '../todoSlice';

//todo - фанк запроса заметки на редактирование
export const asyncEditTodo = createAsyncThunk(
    'todos/asyncEditTodos',
    async function (id, thunkAPI) {
        try {
            const response = await axios(`${API}/${id}`);
            thunkAPI.dispatch(todoActions.editTodo(response.data));
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);
