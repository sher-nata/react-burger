import React, { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './register.module.css';
import { setRegister } from '../services/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { loginPage, homePage } from '../utils/global_const';
import AppLoader from '../components/loader/loader'


export function RegisterPage() {
    
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation();

    const authUser = useSelector(state => state.user.user)
    const isLoading = useSelector(state => state.user.isRegisterLoading)
    const isFailed = useSelector(state => state.user.isRegisterFailed)
    const registerError = useSelector(state => state.user.registerError)
    const [form, setValue] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');


    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
        if (error) setError('')
    };

    const handleSubmit = useCallback( async (e) => {
        e.preventDefault();
        await dispatch(setRegister(form))
    }, [form]
    )

    useEffect(()=>{
        console.log('isFailed: ', isFailed)
        setError(registerError);
    }, [registerError]);
    
    if (authUser) {
        navigate(homePage, {replace: true})    
    }
  
    return (
        <div className={styles.wrapper}>
            {isLoading && <AppLoader/>}
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.edit}>
                    <p className="text text_type_main-medium">Регистрация</p>
                    <Input
                        value={form.name}
                        name={'name'}
                        placeholder="Имя"
                        extraClass="mb-2"
                        onChange={onChange}
                        required={true}
                    />
                    <EmailInput
                        value={form.email}
                        name={'email'}
                        isIcon={false}
                        onChange={onChange}
                        required={true}
                    />
                    <div>
                        <PasswordInput
                            value={form.password}
                            name={'password'}
                            extraClass="mb-2"
                            onChange={onChange}
                            required={true}
                        />
                        {error && <p className={styles.error}>{error}</p>}
                     </div>
                    <Button htmlType="submit" type="primary" size="medium">
                        Зарегистрироваться
                    </Button>
                </div>
                <div className={styles.additional}>
                <div className={styles.additional_row}>
                    <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?</p>    
                    <Link className={styles.link} to={loginPage}>Войти</Link>
                </div>
            </div>
            </form>
        </div>
    );
}