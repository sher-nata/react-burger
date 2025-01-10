import { useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserData } from '../services/actions/user';
import { loginPage } from '../utils/global_const';
import AppLoader from './loader/loader';


interface IProtectedRouteElementProps {
    onlyUnAuth?: boolean;
    element: JSX.Element;
}

export const ProtectedRouteElement = ({ onlyUnAuth=false, element }: IProtectedRouteElementProps) => {

    const location = useLocation();
    const dispatch = useDispatch<any>();
    const authUser = useSelector((state : TUserState) => state.user.user)
    const isLoading = useSelector((state : TUserState) => state.user.isUserLoading)

    const init = async () => {
        await dispatch(getUserData());
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