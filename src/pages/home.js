import React, { useRef }  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './home.module.css';
import AppLoader from '../components/loader/loader';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import Modal from '../components/modal/modal';
import OrderDetails from '../components/order-details/order-details';
import { increaseIngredient, decreaseIngredient } from '../services/actions/burger-ingredients'
import { closeModal } from '../services/actions/modal';
import { constructorAddIngredient, constructorDeleteIngredient } from '../services/actions/burger-constructor';
import { setOrder } from '../services/actions/order-details';
import { getUserData } from '../services/actions/user';
import { loginPage, ingredientDetailsPage } from '../utils/global_const';


export function MainPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [current, setCurrent] = React.useState('bun')
  
    const ingredients = useSelector(state => state.ingredients.ingredients);
    const isFailed = useSelector(state => state.ingredients.isFailed);
    const isLoading = useSelector(state => state.ingredients.isLoading);
  
    const isModalOpen = useSelector(state => state.modal.isModalOpen);
    const isOrder = useSelector(state => state.modal.isOrder);
  
    const constructorIngredients =  useSelector(state => state.constructor.ingredients);
    const constructorBun =  useSelector(state => state.constructor.bun);
  
    const orderDetails = useSelector(state => state.order.orderDetails);
    const isOrderLoading = useSelector(state => state.order.isLoading)
  
    const authUser = useSelector(state => state.user.user)

    const tabContainer = useRef();
    const tabBun = useRef();
    const tabSauce = useRef();
    const tabMain = useRef();
  
    const hableOpenOrderModal = async (e) => {
      if(constructorBun && constructorIngredients && constructorIngredients.length > 0) {
        await dispatch(getUserData)
        if (!authUser) {
          navigate(loginPage, { state: { from: location }} )
          return;
        }
        
        const orderItems = [];
        if (constructorBun) {orderItems.push(constructorBun._id)}
        constructorIngredients.forEach((item) => {
          orderItems.push(item._id)})
        if (constructorBun) {orderItems.push(constructorBun._id)} 
        await dispatch(setOrder(orderItems))
      } 
      if (e) {
        e.stopPropagation();
      }
    }
  
    const handleOpenIngredientModal = e => {
      if (e) {
        e.stopPropagation();
      }
      navigate(`${ingredientDetailsPage}/${e.currentTarget.getAttribute('id')}`, {state: { background: location }})
    }
  
    const handleCloseModal = e => {
      dispatch( closeModal() );
      if (e) {
        e.stopPropagation();
      }
    }
  
    const handleScroll = e =>{
      const startTabPos = tabContainer.current.getBoundingClientRect().bottom;
      const rectBun = tabBun.current.getBoundingClientRect();
      const rectSauce = tabSauce.current.getBoundingClientRect();
      const rectMain = tabMain.current.getBoundingClientRect();
     
      const tabs = ['bun', 'sauce', 'main']
      const distance = [Math.abs(startTabPos - rectBun.top), Math.abs(startTabPos - rectSauce.top), Math.abs(startTabPos - rectMain.top)];
      const smallest = distance.indexOf(Math.min(...distance))
      setCurrent(tabs[smallest])
    }
  
    const handleDrop = (itemId) => {
      const item = ingredients.find(ing => (ing._id === itemId.itemId));
      dispatch(constructorAddIngredient(item));
      dispatch(increaseIngredient(itemId.itemId));
    };
  
    const handleDeleteIngredient = (index) => {
      const itemId = constructorIngredients[index]._id;
      dispatch(constructorDeleteIngredient(index));
      dispatch(decreaseIngredient(itemId));
    }
  
  
    const burgerIngredientsSettings = [{
      title: "Булки",
      type: "bun",
      ref: tabBun
      }, {
      title: "Соусы",
      type: "sauce",
      ref: tabSauce
      }, {
      title: "Начинки",
      type: "main",
      ref: tabMain
      }
    ]
  
    const burgerIngredientsList = [];
  
    burgerIngredientsSettings.forEach((burgerIngredientsItem) => {
      burgerIngredientsList.push(
        <div key={burgerIngredientsItem.type} ref={burgerIngredientsItem.ref}>
          <div className={styles.ingredients__headline}>
            <h1 className="text text_type_main-medium">{burgerIngredientsItem.title}</h1>
          </div>
          <div className={styles.columns}>
            {ingredients.filter(ing => ing.type === burgerIngredientsItem.type).map((ingredient) => (
              <div className={styles.column} key={ingredient._id} id={ingredient._id} onClick={handleOpenIngredientModal}>
                <BurgerIngredients ingredient={ingredient}/> 
              </div> 
            ))}
          </div>
        </div>
      );
    });
    return (
          <DndProvider backend={HTML5Backend}>
          <main className={styles.main__container}> 
            {isOrderLoading && <AppLoader />}
            {isFailed && 'Ошибка при загрузке данных...'}
            {!isFailed && !isLoading && ingredients.length && 
            <>
            <div className={styles.container}>
              <div className={styles.ingredients__title}> 
                <h1 className="text text_type_main-large">Соберите бургер</h1>
              </div>
              
              <div className={styles.ingredients__tab} ref={tabContainer}>
                <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                    Начинки
                </Tab>
              </div>
              <div className={styles.ingredients} onScroll={handleScroll}>
                {burgerIngredientsList}
              </div>
            </div>
            <div className={styles.container}>
              {isModalOpen && isOrder &&
              <Modal onClose={handleCloseModal}>
                  <OrderDetails order={orderDetails.order}/>
              </Modal>}
              <BurgerConstructor bun={constructorBun} ingredients={constructorIngredients} 
                onClick={hableOpenOrderModal} onDrop={handleDrop} onDelete={handleDeleteIngredient}/>
            </div>
            </>
            }
          </main>
          </DndProvider>  
    );
  } 