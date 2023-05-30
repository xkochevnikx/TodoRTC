import { createSlice } from '@reduxjs/toolkit';
import { asyncfetchTodos } from './asyncThunk/asyncFetchTodos';

const initialState = {
    todos: [],
    editTodo: null,
    status: null,
    error: null,
};

//todo - коренной слайс в котором содержиться вся логика обработки данных
const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        //todo - После добавления на сервер вызываю экшен и дублирую этот же новый объект в state.todos
        addTodo(state, action) {
            state.todos.push(action.payload);
        },
        //todo - экшн удаления заметки вызывается после удаления данных на сервере, проходимся по массиву todos и возвращаем только объекты id которых не равно id удалённой заметки.
        deleteTodo(state, action) {
            state.todos = state.todos.filter(
                (todo) => todo.id !== action.payload
            );
        },
        //todo - результат запроса получения редактируемого объекта помешаем в поле editTodo
        editTodo(state, action) {
            state.editTodo = action.payload;
        },
        //todo - получаем id изменяемой заметки и находим её в массиве, далее меняем поле флага на противоположное
        todoCompleted(state, action) {
            const todoComp = state.todos.find(
                (todo) => todo.id === action.payload
            );
            todoComp.completed = !todoComp.completed;
        },
    },
    extraReducers: {
        //todo - обрабатываем состояние фанка запроса данных от сервера при первом рендере
        [asyncfetchTodos.pending]: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        //todo - в результате успешного выполнения помешаем массив с данными в поле todos
        [asyncfetchTodos.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.todos = action.payload;
        },
        //todo - обработка ошибки
        [asyncfetchTodos.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
    },
});

export const { actions: todoActions } = todoSlice;
export default todoSlice.reducer;
