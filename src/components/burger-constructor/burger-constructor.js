import React from 'react';
import PropTypes from 'prop-types';
import burgerConstructorStyles from './burger-constructor.module.css';
import { CurrencyIcon, DragIcon, Button, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'


const IngridientsTotal = ({ total, onClick}) => {
    return (
        <>
            <div className={burgerConstructorStyles.total__price}>
            <p className="text, text_type_digits-medium">{total}</p>
            <p className="text, text_type_digits-medium"><CurrencyIcon type="primary" /></p>
            </div>
            <Button name='orderButton' htmlType="button" type="primary" size="medium" onClick={onClick}>
                Оформить заказ
            </Button>
        </>
    );
}; 

IngridientsTotal.propTypes = {
    total: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
}; 


function BurgerConstructor({ingridients, onClick}) {
    const total = ingridients.reduce((acc, ing) => acc + ing.price * ing.__v, 0);

    const otherIngridients = ingridients.map(ing => 
        {if (ing.__v > 0 && ing.type !== 'bun') 
            { return <div key={ing._id} className={burgerConstructorStyles.other_ingridients}><DragIcon type="primary" />
                <ConstructorElement 
                text={ing.name}
                price={ing.price}
                thumbnail={ing.image_mobile} /></div> }})
    
    const bunIndex = ingridients.findIndex(ing => (ing.type === "bun" && ing.__v > 0));
    return(       
        <>
            <div className={burgerConstructorStyles.components}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '100%'}}>
                    {bunIndex >= 0 &&
                    <div key={`${ingridients[bunIndex]._id}_top`} className={burgerConstructorStyles.ingridient_bun}>
                        <ConstructorElement type="top" isLocked={true}
                        text={`${ingridients[bunIndex].name} (верх)`}
                        price={ingridients[bunIndex].price}
                        thumbnail={ingridients[bunIndex].image_mobile} />
                    </div>}
                    <div className={burgerConstructorStyles.container_other_ingridients}>
                        {otherIngridients}
                    </div>
                    {bunIndex >= 0 &&
                    <div key={`${ingridients[bunIndex]._id}_bottom`} className={burgerConstructorStyles.ingridient_bun}>
                        <ConstructorElement type="bottom" isLocked={true}
                        text={`${ingridients[bunIndex].name} (низ)`}
                        price={ingridients[bunIndex].price}
                        thumbnail={ingridients[bunIndex].image_mobile} />
                    </div>}
                </div>
            </div>
            <div className={burgerConstructorStyles.total}>
                <IngridientsTotal total={total} onClick={onClick}/>
            </div>
        </>          
    );
}

BurgerConstructor.propTypes = {
ingridients: PropTypes.arrayOf(PropTypes.shape({
    _id:  PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,   
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string,
    __v: PropTypes.number.isRequired
    })).isRequired
}; 

export default BurgerConstructor