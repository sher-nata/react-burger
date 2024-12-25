import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate, useLocation  } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './reset-password.module.css';
import { resetPassword, getlocalStorageItem } from '../utils/request-utils';
import { forgotPasswordPage, loginPage } from '../utils/global_const';
import AppLoader from '../components/loader/loader'


export function ResetPasswordPage() {

    const navigate = useNavigate();
    const location = useLocation();

    const authUser = useSelector(state => state.user.user)

    const [isLoading, setLoading] = useState(false);
    const [form, setValue] = useState({ password: '', token: '' });
    const [error, setError] = useState('');

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
        if (error) setError('')
    };

    const handleSubmit = useCallback( async (e) => {
        e.preventDefault();
        setLoading(true)
        await resetPassword(form)
        .then(()=> {
            navigate(loginPage, {replace: true})
        })
        .catch((error) => {
            if (error.name !== 'AbortError') {
                setError(error.message)
            }
          });
        setLoading(false)
    },
    [form]
    )
    
    useEffect(()=>{
  
        if (!authUser && !getlocalStorageItem('forgotPasswordVisited')){
            navigate(forgotPasswordPage, {replace: true})
        }
  
    }, []);


    return (
        <div className={styles.wrapper}>
            {isLoading && <AppLoader/>}
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.edit}>
                    <p className="text text_type_main-medium">Восстановление пароля</p>
                    <PasswordInput
                        onChange={onChange}
                        value={form.password}
                        name={'password'}
                        placeholder="Введите новый пароль"
                        extraClass="mb-2"
                        required={true}
                    />
                    <div>
                        <Input
                            onChange={onChange}
                            value={form.token}
                            name={'token'}
                            placeholder="Введите код из письма"
                            required={true}
                        />
                        {error && <p className={styles.error}>{error}</p>}
                    </div>
                    <Button htmlType="submit" type="primary" size="medium">
                        Восстановить
                    </Button>
                </div>
                <div className={styles.additional_row}>
                    <p className="text text_type_main-default text_color_inactive">Восстановили пароль?</p>
                    <Link className={styles.link} to={loginPage}>Войти</Link>
                </div>
            </form>
        </div>
    );
}