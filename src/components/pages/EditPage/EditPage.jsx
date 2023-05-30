import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { asyncAddEditTodo } from '../../../store/asyncThunk/asyncAddEditTodo';
import { asyncEditTodo } from '../../../store/asyncThunk/asyncEditTodo';
import MyButton from '../../ui/MyButton/MyButton';
import MyInput from '../../ui/MyInput/MyInput';
import cls from './EditPage.module.css';

//todo - страница редактирования заметки, при переходе на неё берём id из адресной строки и делаем запрос на сервер asyncEditTodo(id) на получения этого объекта. В результате успешного запроса данные помещаем в поле редюсера editTodo и тут получаем эти данные на отрисовку
export const EditPage = () => {
    const { id } = useParams();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const editTodo = useSelector((state) => state.todos.editTodo);

    useEffect(() => {
        dispatch(asyncEditTodo(id));
    }, [id]);

    const [editText, setEditText] = useState('');
    const [editImg, setEditImg] = useState('');

    //todo - после появления данных помещаем поля объекта в состояния которые передаём значением в инпуты
    useEffect(() => {
        if (editTodo) {
            setEditText(editTodo.text);
            setEditImg(editTodo.img);
        }
    }, [editTodo]);

    //todo - функция добавления данных. создаём объект на основе свежих данных состояний и вызываем экшн который сделает запрос на бэк и заменит данные кокретного объекта. после этого автоматически навигейт перекинет меня на главную. На главной useEffect дернёт asyncfetchTodos и запросит свежие данные на отрисовку
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
