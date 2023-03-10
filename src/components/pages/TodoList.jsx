import { useEffect, useState } from 'react';
import cls from './TodoList.module.css';
import { asyncAddTodo } from '../../store/asyncThunk/asyncAddTodo';
import { useDispatch, useSelector } from 'react-redux';
import MyButton from '../ui/MyButton/MyButton';
import MyInput from '../ui/MyInput/MyInput';
import TodoItem from '../TodoItem/TodoItem';
import { asyncfetchTodos } from '../../store/asyncThunk/asyncFetchTodos';

const TodoList = () => {
    const [text, setText] = useState('');
    const [img, setImg] = useState('');

    const { status, error, editTodo } = useSelector((state) => state.todos);

    console.log(editTodo);

    const dispatch = useDispatch();

    function addBtnTodo(e) {
        if (!text.trim() || !img.trim()) {
            alert('Заполните все поля!');
            return;
        }
        let newTodo = {
            text,
            img,
            completed: false,
        };
        e.preventDefault();
        dispatch(asyncAddTodo(newTodo));
        setText('');
        setImg('');
    }

    useEffect(() => {
        dispatch(asyncfetchTodos());
    }, []);

    return (
        <div className={cls.container}>
            <div>
                <form
                    className={cls.formBox}
                    action=''>
                    <MyInput
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder='ввести заметку'
                        type='text'
                    />
                    <MyInput
                        value={img}
                        onChange={(e) => setImg(e.target.value)}
                        placeholder='вставить картинку'
                        type='url'
                    />
                    <MyButton
                        type='submit'
                        onClick={addBtnTodo}>
                        Добавить
                    </MyButton>
                </form>
            </div>
            {status === 'loading' && <h2>Loading...</h2>}
            {error && <h2>An error occured: {error} </h2>}
            <TodoItem />
        </div>
    );
};

export default TodoList;
