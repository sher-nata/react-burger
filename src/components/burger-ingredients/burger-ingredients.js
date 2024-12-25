import PropTypes from 'prop-types';
import { useDrag } from "react-dnd";
import style from './burger-ingredients.module.css';
import { CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'


function BurgerIngredients({ ingredient }) {
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

BurgerIngredients.propTypes = {
    ingredient: PropTypes.shape({
        _id:  PropTypes.string,
        name: PropTypes.string.isRequired,
        type: PropTypes.string,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,   
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        __v: PropTypes.number.isRequired
    }).isRequired
  } ; 

export default BurgerIngredients