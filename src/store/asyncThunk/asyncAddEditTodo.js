import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../../globalAPI';

//todo - фанк добавления отредактированного объекта на бэк методом patch
export const asyncAddEditTodo = createAsyncThunk(
    'todos/asyncAddEditTodos',
    async function ({ id, newEditTodo }, thunkAPI) {
        try {
            const response = await axios.patch(`${API}/${id}`, newEditTodo);
            if (!response.data) {
                throw new Error(
                    'Ошибка при добавлении отредактированной заметки на сервер'
                );
            }
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);
