import React, { useRef, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag, useDrop } from "react-dnd";
import PropTypes from 'prop-types';
import {v4 as uuidv4} from 'uuid';
import burgerConstructorStyles from './burger-constructor.module.css';
import { CurrencyIcon, DragIcon, Button, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'
import { CONSTRUCTOR_MOVE_INGRIDIENT } from '../../services/actions/burger-constructor';


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

const ConstructorIngridient = ({ ingridient, index, onDelete}) => {

    const ref = useRef(null);
    const id = ingridient._id;

    const dispatch = useDispatch();

    const [{ handlerId }, drop] = useDrop({
        accept: "constructorIngridient",
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
          
          moveContainerIngridient(dragIndex, hoverIndex)

          item.index = hoverIndex
        },
      })

    const [{ isDragging }, drag] = useDrag({
    type: "constructorIngridient",
    item: () => {
        return { id, index }
    },
    collect: (monitor) => ({
        isDragging: monitor.isDragging(),
    }),
    })
    const opacity = isDragging ? 0 : 1

    drag(drop(ref))


    const moveContainerIngridient = (dragIndex, hoverIndex) => {
        dispatch({type: CONSTRUCTOR_MOVE_INGRIDIENT, 
            payload: {
                dragIndex: dragIndex,
                hoverIndex: hoverIndex
            }
        })
    }
    
    return (
        <div index={index} className={burgerConstructorStyles.other_ingridients} ref={ref}>
            <DragIcon type="primary" />
                <ConstructorElement 
                text={ingridient.name}
                price={ingridient.price}
                thumbnail={ingridient.image_mobile} 
                handleClose={() => onDelete(index)}/>
        </div>
    );
}

ConstructorIngridient.propTypes = {
    ingridient: PropTypes.shape({
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
        }).isRequired,
    index: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired
}; 


function BurgerConstructor({bun=null, ingridients=[], onClick, onDrop, onDelete}) {

    const getTotal = (bun, ingridients) => { return (bun ? bun.price * 2 : 0) + 
        ((ingridients && ingridients.length > 0) ? ingridients.reduce((acc, ing) => acc + ing.price, 0) : 0)}

    const total = useMemo(() => getTotal(bun, ingridients),[bun, ingridients]);

     const [, dropTarget] = useDrop({
        accept: "ingridient",
        drop(itemId) {
            onDrop(itemId);
        },
    });

    const otherIngridients = (ingridients && ingridients.length > 0) ? (ingridients.map((ing, index) => 
        { return <ConstructorIngridient ingridient={ing} index={index} key={uuidv4()} onDelete={onDelete} /> })) :
        ([ 
            <div key={uuidv4()} className={burgerConstructorStyles.ingridient_bun}>
                <div className={`${burgerConstructorStyles.empty_align} constructor-element`}>
                    <div className={burgerConstructorStyles.empty_align}>
                        <span>Выберите начинку</span>    
                    </div>
                </div> 
            </div>
    ])       

    const bunIngridient = ( top ) => {
        return (
            <>
                {bun ?
                (<div key={uuidv4()} className={burgerConstructorStyles.ingridient_bun}>
                    <ConstructorElement type={top ? "top" : "bottom"} isLocked={true}
                    text={`${bun.name} ${top ? "(верх)" : "(низ)" }`}
                    price={bun.price}
                    thumbnail={bun.image_mobile} />
                </div>) : 
                (<div key={uuidv4()} className={burgerConstructorStyles.ingridient_bun}>
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
                    {bunIngridient(true)}
                    <div className={burgerConstructorStyles.container_other_ingridients}>
                        {otherIngridients}                
                    </div>
                    {bunIngridient(false)}
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
        __v: PropTypes.number,
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