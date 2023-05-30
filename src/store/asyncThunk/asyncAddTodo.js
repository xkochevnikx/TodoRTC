import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../../globalAPI';
import { todoActions } from '../todoSlice';

//todo - фанк добавления нового объекта на сервер и локальный редюсер. После добавления на сервер вызываю экшен и дублирую этот же новый объект в state.todos
export const asyncAddTodo = createAsyncThunk(
    'todos/asyncAddTodo',
    async function (newTodo, thunkAPI) {
        try {
            const response = await axios.post(API, newTodo);

            if (!response.data) {
                throw new Error('Ошибка при добавлении заметки на сервер');
            }
            thunkAPI.dispatch(todoActions.addTodo(response.data));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
