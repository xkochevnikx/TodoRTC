import { createSlice } from '@reduxjs/toolkit';
import { asyncDeleteTodo } from './asyncThunk/asyncDeleteTodo';
import { asyncfetchTodos } from './asyncThunk/asyncFetchTodos';
import { asyncTodoCompleted } from './asyncThunk/asyncTodoCompleted';

const initialState = {
    todos: [],
    editTodo: null,
    status: null,
    error: null,
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo(state, action) {
            state.todos.push(action.payload);
        },
        deleteTodo(state, action) {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },
        editTodo(state, action) {
            state.editTodo = action.payload;
        },

        todoCompleted(state, action) {
            const todoComp = state.todos.find((todo) => todo.id === action.payload);
            todoComp.completed = !todoComp.completed;
        },
    },
    extraReducers: {
        [asyncfetchTodos.pending]: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        [asyncfetchTodos.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.todos = action.payload;
        },
        [asyncfetchTodos.rejected]: setError,
        [asyncDeleteTodo.rejected]: setError,
        [asyncTodoCompleted.rejected]: setError,
    },
});

function setError(state, action) {
    state.status = 'rejected';
    state.error = action.payload;
}

export const { actions: todoActions } = todoSlice;
export default todoSlice.reducer;
