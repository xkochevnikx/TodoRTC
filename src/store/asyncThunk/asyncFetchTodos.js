import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../../globalAPI';

//todo - фанк запроса данных с сервера при первом рендере
export const asyncfetchTodos = createAsyncThunk(
    'todos/asyncfetchTodos',
    async function (_, thunkAPI) {
        try {
            const response = await axios(API);
            if (!response.data) {
                throw new Error(
                    'Ошибка запроса данных с сервера при первом рендере компонента'
                );
            }
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);
