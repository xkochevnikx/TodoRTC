import { useEffect, useState } from 'react';
import cls from './TodoList.module.css';
import { asyncAddTodo } from '../../../store/asyncThunk/asyncAddTodo';
import { useDispatch, useSelector } from 'react-redux';
import MyButton from '../../ui/MyButton/MyButton';
import MyInput from '../../ui/MyInput/MyInput';
import { TodoItemList } from '../../TodoItemList/TodoItemList';
import { asyncfetchTodos } from '../../../store/asyncThunk/asyncFetchTodos';

//todo - это главная страница со списком дел, базово она включает в себя форму ввода текста для отправки заметки на сервер. Под формой на основании запроса при первом рендере отрисовывается список TodoItem а так же состояния выполения фанка.
export const TodoList = () => {
    const [text, setText] = useState('');
    const [img, setImg] = useState('');

    //todo - после обработки возможных ошибок при обработке фанков отрисовывам их пользователю
    const { status, error } = useSelector((state) => state.todos);
    //todo - получаем массив заметок
    const todos = useSelector((state) => state.todos.todos);

    const dispatch = useDispatch();

    //todo - функция добавления новой заметки достаёт текущие значения из инпутов создаёт в себе объект со значениями и вызывает асинкфанк добавления нового объекта. После очищает поля ввода.
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

    //todo - при первой отрисовке дёргаем фанк на запрос данных с сервера и в результате добавляем массив заметок в state.todos
    useEffect(() => {
        dispatch(asyncfetchTodos());
    }, []);

    return (
        <div className={cls.container}>
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

            {status === 'loading' && <h2>загрузка...</h2>}
            {error && <h2> ошибка : {error} </h2>}
            {todos && <TodoItemList todos={todos} />}
        </div>
    );
};
