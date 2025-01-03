import React, { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { signIn } from '../services/actions/user';
import { registerPage, forgotPasswordPage } from '../utils/global_const';
import AppLoader from '../components/loader/loader'


export function LoginPage() {
    
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation();

    const authUser = useSelector(state => state.user.user)
    const isFailed = useSelector(state => state.user.isLoginFailed)
    const isLoading = useSelector(state => state.user.isLoginLoading)
    const loginError =  useSelector(state => state.user.loginError)
    const [form, setValue] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    useEffect(()=>{
        setError(loginError);
    }, [loginError]);

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
        setError('')
    };

    const handleSubmit = useCallback( async (e) => {
        e.preventDefault();
        await dispatch(signIn(form))
    },
    [form]
    )

    if (authUser) {
        navigate(location.state?.from ? location.state.from : "/", {replace: true})
    }

    return (
      <div className={styles.wrapper}>
        {isLoading && <AppLoader/>}
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.edit}>
                <p className="text text_type_main-medium">Вход</p>
                <EmailInput
                    onChange={onChange}
                    value={form.email}
                    name={'email'}
                    isIcon={false}
                    required={true}
                />
                <div>
                    <PasswordInput
                        onChange={onChange}
                        value={form.password}
                        name={'password'}
                        extraClass="mb-2"
                        required={true}
                    />
                    {error && <p className={styles.error}>{error}</p>}
                </div>
                <Button htmlType="submit" type="primary" size="medium">
                    Войти
                </Button>
            </div>
            <div className={styles.additional}>
                <div className={styles.additional_row}>
                    <p className="text text_type_main-default text_color_inactive">Вы новый пользователь?</p>    
                    <Link className={styles.link} to={registerPage}>Зарегистрироваться</Link>
                </div>
                <div className={styles.additional_row}>
                    <p className="text text_type_main-default text_color_inactive">Забыли пароль?</p>
                    <Link className={styles.link} to={forgotPasswordPage}>Восстановить пароль</Link>
                </div>
            </div>
        </form>
      </div>
    );
  } 