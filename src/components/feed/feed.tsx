import {v4 as uuidv4} from 'uuid'; 
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './feed.module.css';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { orderStatus } from '../../utils/global_const';

interface FeedOrderProps {
    orders?: IFeedOrder[] | null;
    trunc_ingredients: ITruncIngredients;
    page_url: string;
    display_status? : boolean;
}

interface FeedElementProps {
    order: IFeedOrder;
    trunc_ingredients: ITruncIngredients;
    page_url: string;
    display_status? : boolean;
}

export const FeedElement = ({ order, trunc_ingredients, page_url, display_status=false }: FeedElementProps) => {
    
    const navigate = useNavigate();
    const location = useLocation();

    let total_price: number = 0;
    let count = 0;
    const max_ing_count = 6
    const left_shift = 48
    const over_ingredients = Math.max(order.ingredients.length - max_ing_count, 0)
    const order_ingredients_list: React.ReactNode[] = [];


    const handleOpenFeedOrderModal = (e: React.BaseSyntheticEvent<Event, EventTarget & Element, EventTarget>) => {
        if (e) {
            e.stopPropagation();
        }
        navigate(`${page_url}/${e.currentTarget.getAttribute('id')}`, {state: { background: location }})
    }


    {order.ingredients.forEach((ing_id) => {
        total_price = total_price + trunc_ingredients[ing_id].price
        const imgStyle = {
            position: count == 0 ? 'relative' : 'absolute',
            left: `${count*left_shift}px`,
            zIndex: max_ing_count - count 
          }
        if (count <= 5){
            order_ingredients_list.push(
             //@ts-ignore
             <div key={uuidv4()} className={styles.order_ingredient_preview} style={imgStyle} >
                <div className={styles.order_ingredient_illustration}>
                    <img src={trunc_ingredients[ing_id].image_mobile}/>
                </div>
                {(count == 5 && over_ingredients > 0) && 
                <div className={styles.number_over_ingredients}>
                    <p className="text text_type_digits-default">+{over_ingredients}</p>
                </div>}
            </div>)
        }
         count += 1
        })}

    
    return (
     <div id={String(order.number)} onClick={handleOpenFeedOrderModal}>
        <div className={styles.order_card}>
            <div className={styles.order_number}>
                <div className={styles.number}>
                    <p className="text text_type_digits-default">#{order.number}</p>
                </div> 
                <div className={styles.timestump}>
                    <p className="text text_type_main-small text_color_inactive"><FormattedDate date={new Date(order.createdAt)} /></p>
                </div> 
            </div> 
            <div className={styles.order_name}>
                <p className="text text_type_main-medium">{order.name}</p>
                {display_status && <div className={styles.order_status} style={{color: order.status === 'done' ? '#00cccc' : '##ffffff'}}>
                <p className="text text_type_main-small">{orderStatus[order.status]} </p>
            </div>}
            </div>    
            <div className={styles.order_ingredients_price}>
                <div className={styles.order_ingredients}>
                    {order_ingredients_list}
                </div>
                <div className={styles.order_price}>
                    <p className="text text_type_digits-default">{total_price}</p>
                    <p className="text, text_type_digits-default"><CurrencyIcon type="primary" /></p>
                </div>
            </div>
        </div>
    </div>
    )

}

export function FeedOrder( { orders, trunc_ingredients, page_url, display_status=false }:  FeedOrderProps) {

    const orderList: React.ReactNode[] = [];

    if (orders) {
        orders.forEach((order) => {

            orderList.push(
                <FeedElement key={order.number} order={order} trunc_ingredients={trunc_ingredients} 
                    page_url={page_url} display_status={display_status}/>
            );
        });
    }

    return(
        <>
        {Object.keys(trunc_ingredients).length && orders?.length &&
            
            <div className={styles.container}>
                    {orderList}
            </div> 
        }       
        </> 
    )
}
