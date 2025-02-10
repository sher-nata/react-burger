import { useRef, useMemo } from 'react';
import { useAppDispatch } from "../../services/types"
import { useDrag, useDrop } from "react-dnd";
import {v4 as uuidv4} from 'uuid';
import burgerConstructorStyles from './burger-constructor.module.css';
import { CurrencyIcon, DragIcon, Button, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'
import { constructorMoveIngredient } from '../../services/actions/burger-constructor';


interface IBurgerConstructorProps {
    ingredients?: IConstructorBurgerIngredient[];
    bun?: IBurgerIngredient | null;
    onClick: ((e?: React.SyntheticEvent) => void);
    onDrop(itemId: {itemId: string}): void;
    onDelete(index: number): void;
  };


interface ITotalProps {
    bun?: IBurgerIngredient | null;
    ingredients?: ReadonlyArray<IConstructorBurgerIngredient>;
};

interface IIngredientsTotalProps {
    total: number;
    onClick: ((e?: React.SyntheticEvent) => void);
};

interface IConstructorIngredientProps {
    ingredient: IConstructorBurgerIngredient;
    index: number;
    onDelete(index:number): void;
};


const IngredientsTotal = ({ total, onClick}: IIngredientsTotalProps) => {
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


const ConstructorIngredient = ({ ingredient, index, onDelete }: IConstructorIngredientProps) => {

    const ref = useRef<HTMLDivElement>(null);
    const id = ingredient._id;

    const dispatch = useAppDispatch();

    const [{ handlerId }, drop] = useDrop({
        accept: "constructorIngredient",
        collect(monitor) {
          return {
            handlerId: monitor.getHandlerId(),
          }
        },
        hover(item: {index: number; id: string} | any, monitor) {
          if (!ref.current) {
            return
          }
          const dragIndex = item.index
          const hoverIndex = index
          if (dragIndex === hoverIndex) {
            return
          }
          const hoverBoundingRect = ref.current?.getBoundingClientRect()
          const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
          const clientOffset = monitor.getClientOffset()
          const hoverClientY = clientOffset ? clientOffset.y - hoverBoundingRect.top: 0
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


    const moveContainerIngredient = (dragIndex: number, hoverIndex: number) => {
        dispatch(constructorMoveIngredient(dragIndex, hoverIndex))
    }
    
    return (
        <div data-index={index} className={burgerConstructorStyles.other_ingredients} ref={ref}>
            <DragIcon type="primary" />
                <ConstructorElement 
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image_mobile} 
                handleClose={() => onDelete(index)}/>
        </div>
    );
}


export default function BurgerConstructor({bun=undefined, ingredients=[], onClick, onDrop, onDelete}: IBurgerConstructorProps) {

    const getTotal = ({ bun, ingredients }: ITotalProps) => { return (bun ? bun.price * 2 : 0) + 
        ((ingredients && ingredients.length > 0) ? ingredients.reduce((acc, ing) => acc + ing.price, 0) : 0)}

    const total = useMemo(() => getTotal({ bun, ingredients }),[bun, ingredients]);

     const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(itemId: {itemId: string}) {
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

    const bunIngredient = ( top: boolean ) => {
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

