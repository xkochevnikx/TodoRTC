import cls from './MyButton.module.css';

const MyButton = (props) => {
    const { children, type, onClick } = props;

    return (
        <>
            <button
                className={cls.myBtn}
                type={type}
                onClick={onClick}>
                {children}
            </button>
        </>
    );
};

export default MyButton;
