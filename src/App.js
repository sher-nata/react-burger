import React, { useState } from 'react';
import appStyles from './app.module.css';
import headerStyles from './components/app-header/app-header.module.css';
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/fonts/fonts.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";
import { Tab, BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from './components/app-header/app-header';
import BurgerIngridients from './components/burger-ingridients/burger-ingridients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';

const ingridients = require('./utils/data.json');

const buns = ingridients.filter(ing => ing.type === "bun");
buns[0]['__v'] = 1;
const sauces = ingridients.filter(ing => ing.type === "sauce");
sauces[0]['__v'] = 1;
const maines = ingridients.filter(ing  => ing.type === "main");
maines[0]['__v'] = 1;


function App() {
  
  const [current, setCurrent] = React.useState('one')

  return (
    <div className={appStyles.app}>
      <div className={appStyles.header}>
        <AppHeader>
          <span className={headerStyles.menu__elem}><BurgerIcon type="primary" />Конструктор</span>
          <span className={headerStyles.menu__elem}><ListIcon type="primary" />Лента заказов</span>
        </AppHeader>
      </div>
      <div className={appStyles.main__container}>
        <div className={appStyles.container}>
          <div className={appStyles.ingridients__title}> 
            <h1 className="text text_type_main-large">Соберите бургер</h1>
          </div>
          
          <div className={appStyles.ingridients__tab}>
            <Tab value="<one>" active={current === 'one'} onClick={setCurrent}>
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
            <div>
              <div className={appStyles.ingridients__headline}>
                <h1 className="text text_type_main-medium">Булки</h1>
              </div>
              <div className={appStyles.columns}>
                {buns.map((ingridient) => (
                  <div className={appStyles.column} key={ingridient._id}>
                    <BurgerIngridients name={ingridient.name} price={ingridient.price} image={ingridient.image}
                    value={ingridient.__v}/> 
                  </div> 
                ))}
              </div>
            </div>
            <div>
              <div className={appStyles.ingridients__headline}>
                <h1 className="text text_type_main-medium">Соусы</h1>
              </div>
              <div className={appStyles.columns}>
                {sauces.map((ingridient) => (
                <div key={ingridient._id}>
                  <BurgerIngridients name={ingridient.name} price={ingridient.price} image={ingridient.image}
                  value={ingridient.__v}/> 
                </div> 
                ))}
              </div>
            </div>
            <div>
              <div className={appStyles.ingridients__headline}>
                <h1 className="text text_type_main-medium">Начинки</h1>
              </div>
              <div className={appStyles.columns}>
                {maines.map((ingridient) => (
                <div key={ingridient._id}>
                  <BurgerIngridients name={ingridient.name} price={ingridient.price} image={ingridient.image}
                  value={ingridient.__v}/> 
                </div> 
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={appStyles.container}>
         <BurgerConstructor ingridients={ingridients} />
        </div>
      </div>  
    </div>
  );
}

export default App;
