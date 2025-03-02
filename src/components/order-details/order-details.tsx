import orderDetailsStyles from './order-details.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'

interface OrderDetailsProps {
    order: {
        number: number,
    };
};

export default function OrderDetails({order}: OrderDetailsProps) {
    return(
        <div className={orderDetailsStyles.main_container}>
            <div className={orderDetailsStyles.order_number}>
                <p className="text text_type_digits-large">{order.number}</p>
            </div>  
            <p className="text text_type_main-default">Идентификатор заказа</p>
            <div className={orderDetailsStyles.image}>
                <CheckMarkIcon type="primary" />
            </div>
            <div className={orderDetailsStyles.info}>
                <p className="text text_type_main-small">Ваш заказ начали готовить</p> 
                <p className="text text_type_main-small text_color_inactive">Дождитесь готовности на орбитальной станции</p>
            </div>
        </div>      
    )
};

