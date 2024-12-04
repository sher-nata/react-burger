import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Loader from "react-js-loader";
import appStyles from './app.module.css';
import headerStyles from './components/app-header/app-header.module.css';
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/fonts/fonts.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";
import { Tab, BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from './components/app-header/app-header';
import BurgerIngridients from './components/burger-ingridients/burger-ingridients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import Modal from './components/modal/modal';
import IngridientDetails from './components/ingridient-details/ingridient-details';
import OrderDetails from './components/order-details/order-details';
import { getIngridients, increaseIngridient, decreaseIngridient } from './services/actions/burger-ingridients'
import { openIngridientModal, closeModal } from './services/actions/modal';
import { constructorAddIngridient, constructorDeleteIngridient } from './services/actions/burger-constructor';
import { setOrder } from './services/actions/order-details';


const ingridientsUrl = 'ingredients';
const orderUrl = "orders"


function App() {
  
  const dispatch = useDispatch();

  const [current, setCurrent] = React.useState('bun')

  const ingridients = useSelector(state => state.ingridients.ingridients);
  const isFailed = useSelector(state => state.ingridients.isFailed);
  const isLoading = useSelector(state => state.ingridients.isLoading);

  const selectedIngridient = useSelector(state => state.modal.selectedIngridient);
  const isModalOpen = useSelector(state => state.modal.isModalOpen);
  const isOrder = useSelector(state => state.modal.isOrder);

  const constructorIngridients =  useSelector(state => state.constructor.ingridients);
  const constructorBun =  useSelector(state => state.constructor.bun);

  const orderDetails = useSelector(state => state.order.orderDetails);
  const isOrderLoading = useSelector(state => state.order.isLoading)

  const tabContainer = useRef();
  const tabBun = useRef();
  const tabSauce = useRef();
  const tabMain = useRef();

  const hableOpenOrderModal = e => {
    if(constructorBun && constructorIngridients && constructorIngridients.length > 0) {
      const orderItems = [];
      if (constructorBun) {orderItems.push(constructorBun._id)}
      constructorIngridients.forEach((item) => {
        orderItems.push(item._id)})
      if (constructorBun) {orderItems.push(constructorBun._id)} 
      dispatch(setOrder(orderUrl, orderItems))
    } 
    if (e) {
      e.stopPropagation();
    }
  }

  const hableOpenIngridientModal = e => {
    dispatch( openIngridientModal(e.currentTarget.getAttribute('id')) );
    if (e) {
      e.stopPropagation();
    }
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
    const item = ingridients.find(ing => (ing._id === itemId.itemId));
    dispatch(constructorAddIngridient(item));
    dispatch(increaseIngridient(itemId.itemId));
  };

  const handleDeleteIngridient = (index) => {
    const itemId = constructorIngridients[index]._id;
    dispatch(constructorDeleteIngridient(index));
    dispatch(decreaseIngridient(itemId));
  }

  useEffect(()=>{

    dispatch(getIngridients(ingridientsUrl));

  }, []);


  const burgerIngridientsSettings = [{
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

  const burgerIngridientsList = [];

  burgerIngridientsSettings.forEach((burgerIngridientsItem) => {
    burgerIngridientsList.push(
      <div key={burgerIngridientsItem.type} ref={burgerIngridientsItem.ref}>
        <div className={appStyles.ingridients__headline}>
          <h1 className="text text_type_main-medium">{burgerIngridientsItem.title}</h1>
        </div>
        <div className={appStyles.columns}>
          {ingridients.filter(ing => ing.type === burgerIngridientsItem.type).map((ingridient) => (
            <div className={appStyles.column} key={ingridient._id} id={ingridient._id} onClick={hableOpenIngridientModal}>
              <BurgerIngridients ingridient={ingridient}/> 
            </div> 
          ))}
          {isModalOpen && selectedIngridient && 
              <Modal header="Детали ингридиента" onClose={handleCloseModal}>
                <IngridientDetails ingridient={ingridients.find(ing => (ing._id === selectedIngridient))}/>
              </Modal>}
        </div>
      </div>
    );
  });

  return (
    <div className={appStyles.app}>
      <div className={appStyles.header}>
        <AppHeader>
          <span className={headerStyles.menu__elem}><BurgerIcon type="primary" />Конструктор</span>
          <span className={headerStyles.menu__elem}><ListIcon type="primary" />Лента заказов</span>
        </AppHeader>
      </div>
      <DndProvider backend={HTML5Backend}>
      <main className={appStyles.main__container}> 
        {isOrderLoading && <div className={appStyles.loader_overlay}><div className={appStyles.loader}>
          <Loader type="spinner-default" bgColor={'white'} color={'white'} size={50}/>
          </div></div>}
        {isFailed && 'Ошибка при загрузке данных...'}
        {!isFailed && !isLoading && ingridients.length && 
        <>
        <div className={appStyles.container}>
          <div className={appStyles.ingridients__title}> 
            <h1 className="text text_type_main-large">Соберите бургер</h1>
          </div>
          
          <div className={appStyles.ingridients__tab} ref={tabContainer}>
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
          <div className={appStyles.ingridients} onScroll={handleScroll}>
            {burgerIngridientsList}
          </div>
        </div>
        <div className={appStyles.container}>
          {isModalOpen && isOrder &&
          <Modal onClose={handleCloseModal}>
              <OrderDetails order={orderDetails.order}/>
          </Modal>}
          <BurgerConstructor bun={constructorBun} ingridients={constructorIngridients} 
            onClick={hableOpenOrderModal} onDrop={handleDrop} onDelete={handleDeleteIngridient}/>
        </div>
        </>
        }
      </main>
      </DndProvider>  
    </div>
  );
}

export default App;
