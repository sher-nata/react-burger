import React, { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './register.module.css';
import { setRegister } from '../services/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { loginPage, homePage } from '../utils/global_const';
import AppLoader from '../components/loader/loader'


export function RegisterPage() {
    
    const dispatch = useDispatch<any>()
    const navigate = useNavigate();

    const authUser = useSelector((state: TUserState) => state.user.user)
    const isLoading = useSelector((state: TUserState) => state.user.isRegisterLoading)
    const isFailed = useSelector((state: TUserState) => state.user.isRegisterFailed)
    const registerError = useSelector((state: TUserState) => state.user.registerError)
    const [form, setValue] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');


    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
        if (error) setError('')
    };

    const handleSubmit = useCallback( async (e: React.SyntheticEvent) => {
        e.preventDefault();
        await dispatch(setRegister(form))
    }, [form, dispatch]
    )

    useEffect(()=>{
        console.log('isFailed: ', isFailed)
        setError(registerError);
    }, [registerError, isFailed]);
    
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
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
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