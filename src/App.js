import React, { useEffect, useState } from 'react';
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


const ingridientsUrl = 'https://norma.nomoreparties.space/api/ingredients';

const order = {
  number: "034563"
}

function App() {
  
  const [current, setCurrent] = React.useState('one')

  const [ingridientsState, setIngridients] = React.useState({isLoading: false, hasError: false, ingridients: []})

  const [modalVisible, setModalVisible] = React.useState(false)

  const [selectedIngridient, setSelectedIngridient] = React.useState(null)

  const [isOrder, setIsOrder] = React.useState(false)

  const hableOpenOrderModal = e => {
    setModalVisible(true);
    setIsOrder(true);
    if (e) {
      e.stopPropagation();
    }
  }

  const hableOpenIngridientModal = e => {
    setModalVisible(true);
    setSelectedIngridient(e.currentTarget.getAttribute('id'));
    if (e) {
      e.stopPropagation();
    }
  }

  const handleCloseModal = e => {
    setModalVisible(false);
    setSelectedIngridient(null);
    setIsOrder(false);
    if (e) {
      e.stopPropagation();
    }
  }

  useEffect(()=>{
    const getIngridients = () => {
      setIngridients({ ...ingridientsState, hasError: false, isLoading: true });
      fetch(ingridientsUrl)
        .then(res => res.json())
        .then(data => {
          if(data['data'].length){
            const bunInd = data['data'].findIndex(ing => (ing.type === "bun"));
            if (bunInd >= 0) {
              data['data'][bunInd]['__v'] = 1;
            } 
            const sauceInd = data['data'].findIndex(ing => (ing.type === "sauce"));
            if (sauceInd >= 0) {
              data['data'][sauceInd]['__v'] = 1;
            } 

          } 
          setIngridients({ ...ingridientsState, ingridients: data['data'], isLoading: false })})
        .catch(error => {console.error(error)});
    };
  
    getIngridients();
    

  }, []);

  const { ingridients, isLoading, hasError } = ingridientsState;

  const burgerIngridientsSettings = [{
    title: "Булки",
    type: "bun"
    }, {
    title: "Соусы",
    type: "sauce"
    }, {
    title: "Начинки",
    type: "main"
    }
  ]

  const burgerIngridientsList = [];

  burgerIngridientsSettings.forEach((burgerIngridientsItem) => {
    burgerIngridientsList.push(
      <div key={burgerIngridientsItem.type}>
        <div className={appStyles.ingridients__headline}>
          <h1 className="text text_type_main-medium">{burgerIngridientsItem.title}</h1>
        </div>
        <div className={appStyles.columns}>
          {ingridients.filter(ing => ing.type === burgerIngridientsItem.type).map((ingridient) => (
            <div className={appStyles.column} key={ingridient._id} id={ingridient._id} onClick={hableOpenIngridientModal}>
              <BurgerIngridients ingridient={ingridient}/> 
            </div> 
          ))}
          {modalVisible && selectedIngridient && 
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
      <main className={appStyles.main__container}>
        {hasError && 'Ошибка при загрузке данных...'}
        {!hasError && !isLoading && ingridients.length && 
        <>
        <div className={appStyles.container}>
          <div className={appStyles.ingridients__title}> 
            <h1 className="text text_type_main-large">Соберите бургер</h1>
          </div>
          
          <div className={appStyles.ingridients__tab}>
            <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                Начинки
            </Tab>
          </div>
          <div className={appStyles.ingridients}>
            {burgerIngridientsList}
          </div>
        </div>

        <div className={appStyles.container}>
          {modalVisible && isOrder && 
          <Modal onClose={handleCloseModal}>
              <OrderDetails order={order}/>
          </Modal>}
          <BurgerConstructor ingridients={ingridients} onClick={hableOpenOrderModal}/>
        </div>
        </>
        }
      </main>  
    </div>
  );
}

export default App;
