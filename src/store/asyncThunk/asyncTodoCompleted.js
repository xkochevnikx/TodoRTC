import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../../globalAPI';
import { todoActions } from '../todoSlice';

//todo - фанк изменения статуса заметки. принимает id и внутри фанка обращается к редюсеру и достаёт текущее состояние флага completed. далее отправляет запрос patch на изменение булеан флага completed в объекте на противоположный. после этого дёргаем экшн на такое же изменение флага в массиве todos
export const asyncTodoCompleted = createAsyncThunk(
    'todos/asyncTodoCompleted',
    async function (id, thunkAPI) {
        const { completed } = thunkAPI
            .getState()
            .todos.todos.find((todo) => todo.id === id);

        try {
            await axios.patch(`${API}/${id}`, {
                completed: !completed,
            });

            thunkAPI.dispatch(todoActions.todoCompleted(id));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
