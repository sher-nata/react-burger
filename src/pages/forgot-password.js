import React, { useState, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forgot-password.module.css';
import { forgotPassword } from '../utils/request-utils';
import { loginPage } from '../utils/global_const';
import { resetPasswordPage } from '../utils/global_const';
import AppLoader from '../components/loader/loader'


export function ForgotPasswordPage() {

    const navigate = useNavigate();
    const location = useLocation();

    const [isLoading, setLoading] = useState(false);
    const [form, setValue] = useState({ email: '' });
    const [error, setError] = useState('');

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
        if (error) setError('')
    };

    const handleSubmit = useCallback( async (e) => {
        e.preventDefault();
        setLoading(true)
        await forgotPassword(form.email)
        .then(()=> {
            navigate(resetPasswordPage)
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
    
    return (
        <div className={styles.wrapper}>
            {isLoading && <AppLoader/>}
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.edit}>
                    <p className="text text_type_main-medium">Восстановление пароля</p>
                    <div>
                        <EmailInput
                            onChange={onChange}
                            value={form.email}
                            name={'email'}
                            placeholder="Укажите e-mail"
                            isIcon={false}
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