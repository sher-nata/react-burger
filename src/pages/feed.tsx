import {v4 as uuidv4} from 'uuid'; 
import { useEffect }  from 'react';
import { useAppDispatch, useAppSelector } from '../services/types';
import styles from "./feed.module.css"
import { FeedOrder } from "../components/feed/feed"
import { WS_FEED_CONNECT, WS_FEED_DISCONNECT } from '../services/actions/feed';
import { wsBaseUrl, wsFeedUrl, ordersFeedPage } from "../utils/global_const"
import AppLoader from '../components/loader/loader';

export function FeedPage() {

    const trunc_ingredients = useAppSelector(state => state.ingredients.trunc_ingredients);
    const isFailed = useAppSelector(state => state.ingredients.isFailed);
    const isLoading = useAppSelector(state => state.ingredients.isLoading);

    const feed = useAppSelector(state => state.feed.feed);
    const ws_status = useAppSelector(state => state.feed.status);

    const MAX_STAT = 8
    const orders = feed?.orders
    const total_day = feed?.totalToday
    const total_all = feed?.total
    const order_done = orders ? orders.filter(order => order.status === 'done').map((order) => (order.number)).slice(0, MAX_STAT) : []
    const order_pending = orders ? orders.filter(order => order.status === 'pending').map((order) => (order.number)).slice(0, MAX_STAT) : []

    const is_ready = !isFailed && !isLoading && Object.keys(trunc_ingredients).length && ws_status === 'connected' && feed
    const is_loading = isLoading || ws_status === 'connecting'

    const orderList: React.ReactNode[] = [];
    const order_done_arr: React.ReactNode[] = [];
    const order_pending_arr: React.ReactNode[] = [];

    const dispatch = useAppDispatch();


    useEffect(() => {
        dispatch({
          type: WS_FEED_CONNECT,
          payload: wsBaseUrl + wsFeedUrl
        });
        return () => { dispatch({ type: WS_FEED_DISCONNECT })
        }
      }, [])


    order_done.forEach((number) => {
    order_done_arr.push(
        <p key={uuidv4()}  className="text text_type_main-default">{number}</p>
        );
    });
    order_pending.forEach((number) => {
        order_pending_arr.push(
            <p key={uuidv4()}  className="text text_type_main-default">{number}</p>
            );
        });
    
    
    return (
        <div className={styles.wrapper}>
            {is_loading && <AppLoader/>}
            <main className={styles.main__container}>
                {isFailed && 'Ошибка при загрузке данных...'}
                {is_ready &&
                <>
                <div className={styles.container}> 
                    <div className={styles.title}> 
                        <h1 className="text text_type_main-large">Лента заказов</h1>
                    </div>
                    <div className={styles.feed_container}> 
                        <FeedOrder orders={orders} trunc_ingredients={trunc_ingredients} page_url={ordersFeedPage} />
                    </div>
                </div>
                <div className={styles.container_statistic}> 
                    <div className={styles.container_done_work}>
                        <div className={styles.container_done_work__columns}>  
                            <p className="text text_type_main-medium">Готовы:</p>
                            <div className={styles.container_done_work__list} style={{color: '#00CCCC'}}>  
                                {order_done_arr}
                            </div>   
                        </div>
                        <div className={styles.container_done_work__columns}>  
                            <p className="text text_type_main-medium">В работе:</p>
                            <div className={styles.container_done_work__list}>  
                                {order_pending_arr}
                            </div>
                        </div>
                    </div>
                    <div className={styles.container_statistic__completed}>
                        <p className="text text_type_main-medium">Выполнено за все время:</p>
                        <p className="text text_type_digits-large">{total_all}</p>
                    </div>
                    <div className={styles.container_statistic__completed}>
                        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                        <p className="text text_type_digits-large">{total_day}</p>
                    </div>
                </div>   
                </>
                } 
            </main>
        </div>

    )
}