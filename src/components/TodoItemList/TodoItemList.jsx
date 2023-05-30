import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncDeleteTodo } from '../../store/asyncThunk/asyncDeleteTodo';
import { asyncTodoCompleted } from '../../store/asyncThunk/asyncTodoCompleted';
import cls from './TodoItemList.module.css';

//todos - компонент отрисовки заметок. принимает массив данных от родителя. Каждая заметка имеет функционал по изменению состояния completed, ссылку на страницу редактирования заметки и кнопку удаления себя.
export const TodoItemList = ({ todos }) => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    return (
        <ul className={cls.readBox}>
            {todos.map((todo) => (
                <li
                    className={cls.listStyle}
                    key={todo.id}>
                    <div className={cls.todoTitle}>
                        <input
                            type='checkbox'
                            onChange={() =>
                                dispatch(asyncTodoCompleted(todo.id))
                            }
                        />
                        <span
                            className={cls.editTodoBtn}
                            onClick={() => navigate(`/edit/${todo.id}`)}>
                            ✎
                        </span>

                        <span
                            className={
                                todo.completed ? cls.completed : cls.noCompleted
                            }>
                            {todo.text}
                        </span>

                        <span
                            className={cls.deleteTodoBtn}
                            onClick={() => dispatch(asyncDeleteTodo(todo.id))}>
                            &times;
                        </span>
                    </div>
                    <img
                        src={todo.img}
                        className={cls.img}
                    />
                </li>
            ))}
        </ul>
    );
};
