import { useRef, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from "react-dnd";
import PropTypes from 'prop-types';
import {v4 as uuidv4} from 'uuid';
import burgerConstructorStyles from './burger-constructor.module.css';
import { CurrencyIcon, DragIcon, Button, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'
import { constructorMoveIngredient } from '../../services/actions/burger-constructor';


const IngredientsTotal = ({ total, onClick}) => {
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

IngredientsTotal.propTypes = {
    total: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
}; 

const ConstructorIngredient = ({ ingredient, index, onDelete}) => {

    const ref = useRef(null);
    const id = ingredient._id;

    const dispatch = useDispatch();

    const [{ handlerId }, drop] = useDrop({
        accept: "constructorIngredient",
        collect(monitor) {
          return {
            handlerId: monitor.getHandlerId(),
          }
        },
        hover(item, monitor) {
          if (!ref.current) {
            return
          }
          const dragIndex = item.index
          const hoverIndex = index
          if (dragIndex === hoverIndex) {
            return
          }
          const hoverBoundingRect = ref.current?.getBoundingClientRect()
          const hoverMiddleY =
            (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
          const clientOffset = monitor.getClientOffset()
          const hoverClientY = clientOffset.y - hoverBoundingRect.top
          if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return
          }
          if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return
          }
          
          moveContainerIngredient(dragIndex, hoverIndex)

          item.index = hoverIndex
        },
      })

    const [{ isDragging }, drag] = useDrag({
    type: "constructorIngredient",
    item: () => {
        return { id, index }
    },
    collect: (monitor) => ({
        isDragging: monitor.isDragging(),
    }),
    })
    const opacity = isDragging ? 0 : 1

    drag(drop(ref))


    const moveContainerIngredient = (dragIndex, hoverIndex) => {
        dispatch(constructorMoveIngredient(dragIndex, hoverIndex))
    }
    
    return (
        <div index={index} className={burgerConstructorStyles.other_ingredients} ref={ref}>
            <DragIcon type="primary" />
                <ConstructorElement 
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image_mobile} 
                handleClose={() => onDelete(index)}/>
        </div>
    );
}

ConstructorIngredient.propTypes = {
    ingredient: PropTypes.shape({
        _id:  PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,   
        price: PropTypes.number.isRequired,
        image: PropTypes.string,
        image_mobile: PropTypes.string.isRequired,
        image_large: PropTypes.string,
        __v: PropTypes.number,
        uniqueId: PropTypes.string,
        }).isRequired,
    index: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired
}; 


function BurgerConstructor({bun=null, ingredients=[], onClick, onDrop, onDelete}) {

    const getTotal = (bun, ingredients) => { return (bun ? bun.price * 2 : 0) + 
        ((ingredients && ingredients.length > 0) ? ingredients.reduce((acc, ing) => acc + ing.price, 0) : 0)}

    const total = useMemo(() => getTotal(bun, ingredients),[bun, ingredients]);

     const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(itemId) {
            onDrop(itemId);
        },
    });

    const otherIngredients = (ingredients && ingredients.length > 0) ? (ingredients.map((ing, index) => 
        { return <ConstructorIngredient ingredient={ing} index={index} key={ing.uniqueId} onDelete={onDelete} /> })) :
        ([ 
            <div key='empty_ingredient' className={burgerConstructorStyles.ingredient_bun}>
                <div className={`${burgerConstructorStyles.empty_align} constructor-element`}>
                    <div className={burgerConstructorStyles.empty_align}>
                        <span>Выберите начинку</span>    
                    </div>
                </div> 
            </div>
    ])       

    const bunIngredient = ( top ) => {
        return (
            <>
                {bun ?
                (<div key={uuidv4()} className={burgerConstructorStyles.ingredient_bun}>
                    <ConstructorElement type={top ? "top" : "bottom"} isLocked={true}
                    text={`${bun.name} ${top ? "(верх)" : "(низ)" }`}
                    price={bun.price}
                    thumbnail={bun.image_mobile} />
                </div>) : 
                (<div key={`'empty_bun_'${top ? 'top': 'bottom'}`} className={burgerConstructorStyles.ingredient_bun}>
                    <div className={`${burgerConstructorStyles.empty_align} constructor-element ${top ? "constructor-element_pos_top" : "constructor-element_pos_bottom"}`}>
                        <div className={burgerConstructorStyles.empty_align}>
                        <span>Выберите булку</span>    
                        </div>
                    </div> 
                </div>)}  
            </>
        );
    }

    return(       
        <>
            <div className={burgerConstructorStyles.components} ref={dropTarget}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '100%'}}>
                    {bunIngredient(true)}
                    <div className={burgerConstructorStyles.container_other_ingredients}>
                        {otherIngredients}                
                    </div>
                    {bunIngredient(false)}
                </div>
            </div>
            <div className={burgerConstructorStyles.total}>
                <IngredientsTotal total={total} onClick={onClick}/>
            </div>
        </>          
    );
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.shape({
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
        __v: PropTypes.number,
        uniqueId: PropTypes.string.isRequired,
        })),
    bun: PropTypes.shape({
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
        __v: PropTypes.number,
        }),
    onClick: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}; 

export default BurgerConstructor