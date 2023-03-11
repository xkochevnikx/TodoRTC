import cls from './MyInput.module.css';

const MyInput = (props) => {
    const { placeholder, type, value, onChange } = props;

    return (
        <input
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={onChange}
            className={cls.myInput}
        />
    );
};

export default MyInput;
