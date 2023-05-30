import { configureStore } from '@reduxjs/toolkit';
import todoSlice from './todoSlice';

//todo - корневой редюсер
export default configureStore({
    reducer: {
        todos: todoSlice,
    },
});
