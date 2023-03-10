import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { todoActions } from '../todoSlice';

export const asyncTodoCompleted = createAsyncThunk(
    'todos/asyncTodoCompleted',
    async function (id, thunkAPI) {
        const { completed } = thunkAPI.getState().todos.todos.find((todo) => todo.id === id);

        try {
            await axios.patch(`http://localhost:8000/todos/${id}`, {
                completed: !completed,
            });

            thunkAPI.dispatch(todoActions.todoCompleted(id));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
