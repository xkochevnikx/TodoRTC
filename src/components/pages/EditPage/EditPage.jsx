import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { asyncAddEditTodo } from '../../../store/asyncThunk/asyncAddEditTodo';
import { asyncEditTodo } from '../../../store/asyncThunk/asyncEditTodo';
import MyButton from '../../ui/MyButton/MyButton';
import MyInput from '../../ui/MyInput/MyInput';
import cls from './EditPage.module.css';

export const EditPage = () => {
    const { id } = useParams();

    useEffect(() => {
        dispatch(asyncEditTodo(id));
    }, []);

    const editTodo = useSelector((state) => state.todos.editTodo);

    const [editText, setEditText] = useState('');
    const [editImg, setEditImg] = useState('');

    useEffect(() => {
        if (editTodo) {
            setEditText(editTodo.text);
            setEditImg(editTodo.img);
        }
    }, [editTodo]);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    function addEditTodo(e) {
        if (!editText.trim() || !editImg.trim()) {
            alert('Заполните все поля!');
            return;
        }
        let newEditTodo = {
            text: editText,
            img: editImg,
            completed: false,
        };
        e.preventDefault();
        dispatch(asyncAddEditTodo({ id, newEditTodo }));
        navigate('/');
    }

    return (
        <div className={cls.container}>
            <form
                className={cls.formBox}
                action=''>
                <h2>Редактировать заметку</h2>
                <MyInput
                    type='text'
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                />
                <MyInput
                    type='url'
                    value={editImg}
                    onChange={(e) => setEditImg(e.target.value)}
                />
                <MyButton
                    type='submit'
                    onClick={addEditTodo}>
                    Сохранить
                </MyButton>
            </form>
        </div>
    );
};
