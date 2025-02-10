import React, { useState, useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from "../../services/types"
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { setUserData } from '../../services/actions/user';
import styles from './profile.module.css'


export default function Profile() {

    const dispatch = useAppDispatch()

    const authUser = useAppSelector(state => state.user.user)
    const [valuesChanged, setvaluesChanged] = useState(false);
    const [form, setValue] = useState({name: "", email: "", password: '' });

    useEffect(()=>{
        if (authUser) {
            setValue({name: authUser.name, email: authUser.email, password: '' });
        }
    }, [authUser]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
        setvaluesChanged(true)
    };
    

    const resetChanges = (e: React.BaseSyntheticEvent<Event, EventTarget & Element, EventTarget>) => {
        e.preventDefault()
        if (authUser){
            setValue({name: authUser.name, email: authUser.email, password: '' });
        }
        setvaluesChanged(false)
    }

    const handleSubmit = useCallback(async (e: React.SyntheticEvent) => {
        e.preventDefault();
        dispatch(setUserData(form)) 
        setvaluesChanged(false)
    }, [form, dispatch])

return(
    <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.edit}>
            <Input
                onChange={onChange}
                value={form.name}
                name={'name'}
                placeholder="Имя"
                icon="EditIcon" 
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
            />
            <EmailInput
                onChange={onChange}
                value={form.email}
                name={'email'}
                placeholder="Логин"
                isIcon={true}
            />
            <PasswordInput
                onChange={onChange}
                value={form.password}
                name={'password'}
                placeholder="Пароль"
                icon="EditIcon"
                extraClass="mb-2"
            />
            {valuesChanged && <div className={styles.button}>
                <Button htmlType="button" type="secondary" size="medium" onClick={resetChanges}>
                    Отмена
                </Button>
                <Button htmlType="submit" type="primary" size="medium">
                    Сохранить
                </Button>
            </div>}
        </div>
    </form>
    )
}