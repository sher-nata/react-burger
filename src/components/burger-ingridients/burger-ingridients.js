import React from 'react';
import PropTypes from 'prop-types';
import burgerIngridientsStyles from './burger-ingridients.module.css';
import { CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'


function BurgerIngridients({name, price, image, value=0}) {
    return(
        <div className={burgerIngridientsStyles.ingridient}>
            <img src={image}/>
            <p className="text text_type_digits-default">{price} <CurrencyIcon type="primary" /></p>
            <p className="text text_type_main-small">{name}</p>
            {value > 0 &&
                <Counter count={value} size="default" extraClass="m-1" />
            }
        </div>          
    )
}

BurgerIngridients.propTypes = {
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
    value: PropTypes.number
  }; 

export default BurgerIngridients