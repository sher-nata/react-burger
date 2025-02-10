import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from "../../services/types";
import styles from './feed-order-details.module.css';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { orderUrl } from '../../utils/global_const';
import { appRequest } from '../../utils/request-utils';


interface FeedElementProps {
    isModal?: boolean;
}

export default function FeedOrderDetails({ isModal = false }: FeedElementProps) {

    const { number } = useParams();
    const trunc_ingredients = useAppSelector(state => state.ingredients.trunc_ingredients);
    const feed_all = useAppSelector(state => state.feed.feed);
    const feed_history = useAppSelector(state => state.history.feed);

    const [order, setOrder] = useState<IFeedOrder | undefined>(undefined);

    const oreder_status: { [key: string]: string } = {
        'done': 'Выполнен',
        'pending': 'В работе',
        'created': 'Создан'
    }

    const getOrder = async (number: string) => {

        await appRequest(`${orderUrl}/${number}`).then((data) => {
            const orders = data['orders']
            setOrder(orders[0])
        })
            .catch((error) => {
                if (error.name !== 'AbortError') {
                    console.log(error.message)
                }
            });

    };

    useEffect(() => {
        let forder = feed_all?.orders.find(order => (order.number === Number(number)))
        if (forder) {
            setOrder(forder)
        }
        if (!order) {
            forder = feed_history?.orders.find(order => (order.number === Number(number)))
            if (forder) {
                setOrder(forder)
            }
        }
        if (!order && number) {
            getOrder(number)
        }
    }, []);

    let total_price: number = 0;
    const order_ingredients_list: React.ReactNode[] = [];

    const ingredients_count = order?.ingredients.reduce((acc: { [key: string]: number }, i: string) => {
        if (acc.hasOwnProperty(i)) {
            acc[i] += 1;
        } else {
            acc[i] = 1;
        }
        return acc;
    }, {})

    {
        if (ingredients_count) {
            for (const [ing_id, ing_count] of Object.entries(ingredients_count)) {

                total_price = total_price + trunc_ingredients[ing_id].price * ingredients_count[ing_id]

                order_ingredients_list.push(
                    <div key={ing_id} className={styles.order_ingredient}>
                        <div className={styles.order_ingredient_preview}>
                            <div className={styles.order_ingredient_illustration}>
                                <img src={trunc_ingredients[ing_id].image_mobile} />
                            </div>
                        </div>
                        <div className={styles.order_ingredient_name}>
                            <p className="text text_type_main-default">{trunc_ingredients[ing_id].name}</p>
                        </div>
                        <div className={styles.order_ingredient_price}>
                            <p className="text text_type_main-medium">{ing_count} x {trunc_ingredients[ing_id].price}</p>
                            <p className="text, text_type_digits-default"><CurrencyIcon type="primary" /></p>
                        </div>
                    </div>)
            }
        }
    }


    return (
        (order !== undefined) ?
            <div className={styles.main_container}>
                {!isModal && <div className={styles.order_number}>
                    <p className="text text_type_digits-default">#{order.number}</p>
                </div>}
                <div className={styles.order_name}>
                    <p className="text text_type_main-medium">{order.name}</p>
                </div>
                <div className={styles.order_status}>
                    <p className="text text_type_main-small">{oreder_status[order.status] ? oreder_status[order.status] : ""}</p>
                </div>
                <div className={styles.order_name}>
                    <p className="text text_type_main-medium">Состав:</p>
                </div>
                <div className={styles.order_ingredients_list}>
                    <div className={styles.order_ingredients}>
                        {order_ingredients_list}
                    </div>
                </div>
                <div className={styles.order_time_price}>
                    <div className={styles.order_time}>
                        <p className="text text_type_main-small text_color_inactive">
                            <FormattedDate date={new Date(order.createdAt)} /></p>
                    </div>
                    <div className={styles.order_price}>
                        <p className="text text_type_main-small">{total_price}</p>
                        <p className="text, text_type_digits-default"><CurrencyIcon type="primary" /></p>
                    </div>
                </div>
            </div>
            : null
    )
};