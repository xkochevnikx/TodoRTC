import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncDeleteTodo } from '../../store/asyncThunk/asyncDeleteTodo';
import { asyncEditTodo } from '../../store/asyncThunk/asyncEditTodo';
import { asyncTodoCompleted } from '../../store/asyncThunk/asyncTodoCompleted';
import cls from './TodoItem.module.css';

const TodoItem = () => {
    const todos = useSelector((state) => state.todos.todos);

    const dispatch = useDispatch();

    return (
        <>
            <ul className={cls.readBox}>
                {todos.map((todo) => (
                    <li
                        className={cls.listStyle}
                        key={todo.id}>
                        <div className={cls.todoTitle}>
                            <input
                                type='checkbox'
                                onChange={() => dispatch(asyncTodoCompleted(todo.id))}
                            />
                            <span
                                className={cls.editTodoBtn}
                                onClick={() => dispatch(asyncEditTodo(todo.id))}>
                                ✎
                            </span>
                            {todo.completed ? (
                                <span style={{ fontWeight: 'bold', fontSize: '20px' }}>
                                    {todo.text}
                                </span>
                            ) : (
                                <span>{todo.text}</span>
                            )}

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
        </>
    );
};

export default TodoItem;
