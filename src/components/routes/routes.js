import React from 'react';
import { EditPage } from '../pages/EditPage/EditPage';
import { TodoList } from '../pages/TodoList/TodoList';

//todo - все пути
export const routes = [
    { path: '/', component: <TodoList /> },
    { path: '/edit/:id', component: <EditPage /> },
];
