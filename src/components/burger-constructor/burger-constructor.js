import React from 'react';
import PropTypes from 'prop-types';
import burgerConstructorStyles from './burger-constructor.module.css';
import { CurrencyIcon, DragIcon, Button, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'


const IngridientsTotal = ({ total }) => {
    return (
        <>
            <div className={burgerConstructorStyles.total__price}>
            <p className="text, text_type_digits-medium">{total}</p>
            <p className="text, text_type_digits-medium"><CurrencyIcon type="primary" /></p>
            </div>
            <Button htmlType="button" type="primary" size="medium">Оформить заказ</Button>
        </>
    );
}; 


function BurgerConstructor({ingridients}) {
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
                    <div key={`${ingridients[bunIndex]._id}_top`} className={burgerConstructorStyles.ingridient_bun}>
                        <ConstructorElement type="top" isLocked={true}
                        text={ingridients[bunIndex].name}
                        price={ingridients[bunIndex].price}
                        thumbnail={ingridients[bunIndex].image_mobile} />
                    </div>
                    <div className={burgerConstructorStyles.container_other_ingridients}>
                        {otherIngridients}
                    </div>
                    <div key={`${ingridients[bunIndex]._id}_bottom`} className={burgerConstructorStyles.ingridient_bun}>
                        <ConstructorElement type="bottom" isLocked={true}
                        text={ingridients[bunIndex].name}
                        price={ingridients[bunIndex].price}
                        thumbnail={ingridients[bunIndex].image_mobile} />
                    </div>
                </div>
            </div>
            <div className={burgerConstructorStyles.total}>
                <IngridientsTotal total={total} />
            </div>
        </>          
    );
}

IngridientsTotal.propTypes = {
    orderId: PropTypes.number
  }; 

  BurgerConstructor.propTypes = {
    ingridients: PropTypes.arrayOf(PropTypes.shape({
        _id:  PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,   
        price: PropTypes.number,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        __v: PropTypes.number
      }))
  }; 

export default BurgerConstructor