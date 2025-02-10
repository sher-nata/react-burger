import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../services/types"
import styles from './profile.module.css';
import { signOut } from '../services/actions/user';
import { ordersHistoryPage, loginPage } from '../utils/global_const';
import AppLoader from '../components/loader/loader'

const userDataUrl = 'auth/user'


export function ProfilePage() {

    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const authUser = useAppSelector(state => state.user.user)
    const isUserLoading = useAppSelector(state => state.user.isUserLoading)
    const [isLoading, setIsLoading] = useState(false);


    useEffect(()=>{
        setIsLoading(isLoading);
    }, [isUserLoading]);


    const handleSignOut = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        await dispatch(signOut())
        if (!authUser){
            navigate(loginPage, { replace: true })
        }
    }

    return (
        <div className={styles.wrapper}>
            {isLoading && <AppLoader/>} 
            <div className={styles.navigation}>
                <div className={styles.menu}>
                    <div className={styles.navigation_frame}>
                        <NavLink to='' end style={({ isActive }) => {return isActive ? { color: "white" } : {};}}>
                            <p className="text text_type_main-medium">Профиль</p>
                        </NavLink>
                    </div>
                    <div className={styles.navigation_frame}>
                        <NavLink to={ordersHistoryPage} style={({ isActive }) => {return isActive ? { color: "white" } : {};}}>
                            <p className="text text_type_main-medium">История заказов</p>
                        </NavLink>
                    </div>
                    <div className={styles.navigation_frame}>
                        <NavLink to={loginPage} onClick={handleSignOut}>
                            <p className="text text_type_main-medium">Выход</p>
                        </NavLink>
                    </div>
                </div>
                <div className={styles.navigation_additional}>
                    <p className="text text_type_main-small text_color_inactive">В этом разделе 
                        вы можете разместить свои персональные данные</p>
                </div>
            </div>
            <Outlet />
        </div>
    );
}