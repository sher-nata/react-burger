import { useEffect, useState }  from 'react';
import { useAppDispatch, useAppSelector } from '../services/types';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from "./order-history.module.css"
import { FeedOrder } from "../components/feed/feed"
import { WS_ORDER_HISTORY_CONNECT, WS_ORDER_HISTORY_DISCONNECT } from '../services/actions/order-history';
import { wsBaseUrl } from "../utils/global_const"
import { getAccessToken, getlocalStorageItem } from '../utils/request-utils';
import { profilePage, ordersHistoryPage } from '../utils/global_const';


export function OrderHistoryPage({}) {
    
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const trunc_ingredients = useAppSelector(state => state.ingredients.trunc_ingredients);
    const isFailed = useAppSelector(state => state.ingredients.isFailed);
    const isLoading = useAppSelector(state => state.ingredients.isLoading);

    const feed = useAppSelector(state => state.history.feed);
    const ws_status = useAppSelector(state => state.history.status);
    
    const [ modalPath, setModalPath]  = useState<string | null>(null)

    const orders = feed?.orders ? [...feed?.orders].reverse() : []

    const is_ready = Object.keys(trunc_ingredients).length && ws_status === 'connected' && orders

    useEffect(() => {
        const wssUrl = new URL(wsBaseUrl);
        const accessToken = getAccessToken() 
        wssUrl.searchParams.set( "token", accessToken ? accessToken.replace("Bearer ", "") : '');

        dispatch({
            type: WS_ORDER_HISTORY_CONNECT,
            payload: wssUrl
        });

        setModalPath(getlocalStorageItem('modalPath'))

        return () => { dispatch({ type: WS_ORDER_HISTORY_DISCONNECT })
        }
    }, [])

    useEffect(() => {
        if(modalPath){
            navigate(modalPath, {state: { background: location }})
            setModalPath(null)
        }
    }, [modalPath])


    return (
        <div className={styles.wrapper}>
            <main className={styles.main__container}>
                {isFailed && 'Ошибка при загрузке данных...'}
                {is_ready &&
                <div className={styles.container}> 
                    <div className={styles.feed_container}> 
                        <FeedOrder orders={orders} trunc_ingredients={trunc_ingredients} 
                        page_url={`${profilePage}/${ordersHistoryPage}`} display_status={true} />
                    </div>
                </div>
                } 
            </main>
        </div>
        )
}
