import React from 'react';
import PropTypes from 'prop-types';
import burgerIngridientsStyles from './burger-ingridients.module.css';
import { CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'


function BurgerIngridients({ingridient}) {
    return(
        <div className={burgerIngridientsStyles.ingridient}>
            <img src={ingridient.image}/>
            <p className="text text_type_digits-default">{ingridient.price} <CurrencyIcon type="primary" /></p>
            <p className="text text_type_main-small">{ingridient.name}</p>
            {ingridient.__v > 0 &&
                <Counter count={ingridient.__v} size="default" extraClass="m-1" />
            }
        </div>          
    )
}

BurgerIngridients.propTypes = {
    ingridient: PropTypes.shape({
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

export default BurgerIngridients