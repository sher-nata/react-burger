import { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserData } from '../services/actions/user';
import { loginPage, homePage } from '../utils/global_const';
import AppLoader from './loader/loader';


export const ProtectedRouteElement = ({ onlyUnAuth=false, element }) => {

    const location = useLocation();
    const dispatch = useDispatch();
    const authUser = useSelector(state => state.user.user)
    const isLoading = useSelector(state => state.user.isUserLoading)
    const [isLoaded, setIsLoaded] = useState(false);

    const init = async () => {
        await dispatch(getUserData());
        setIsLoaded(true)
    };

    useEffect(() => {
        init();
    }, []);

    if (isLoading) return <AppLoader />;
    
    if (onlyUnAuth) {
        return !authUser ? element : <Navigate to={location.state?.from ? location.state.from : "/"} replace={ true }/>;
    }
    else {
        return authUser ? element : <Navigate to={loginPage} state={{ from: location }} />;
    }
    
    
} 