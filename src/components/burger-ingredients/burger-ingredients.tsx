import { useDrag } from "react-dnd";
import style from './burger-ingredients.module.css';
import { CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'

interface IBurgerIngredientsProps {
    ingredient: IBurgerIngredient;
  }

export default function BurgerIngredients( { ingredient }: IBurgerIngredientsProps ) {
    const itemId = ingredient['_id'];

    const [, dragRef] = useDrag({
        type: "ingredient",
        item: {itemId}
    });
    
    return(
        <div className={style.ingredient} ref={dragRef}>
            <img src={ingredient.image}/>
            <p className="text text_type_digits-default">{ingredient.price} <CurrencyIcon type="primary" /></p>
            <p className="text text_type_main-small">{ingredient.name}</p>
            {ingredient.__v > 0 &&
                <Counter count={ingredient.__v} size="default" extraClass="m-1" />
            }
        </div>          
    )
}
