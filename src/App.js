import { useEffect }  from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ProtectedRouteElement } from './components/protected-route-element';
import { LoginPage } from './pages/login';
import { MainPage } from './pages/home';
import { RegisterPage } from './pages/register';
import { ForgotPasswordPage } from './pages/forgot-password';
import { ResetPasswordPage } from './pages/reset-password';
import { ProfilePage } from './pages/profile';
import { NotFoundPage } from './pages/not-found';
import headerStyles from './components/app-header/app-header.module.css';
import { BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app.module.css';
import AppHeader from './components/app-header/app-header';
import Modal from './components/modal/modal';
import IngredientDetails from './components/ingredient-details/ingredient-details';
import Profile from './components/profile/profile';
import { getIngredients } from './services/actions/burger-ingredients';
import { homePage, loginPage, registerPage, ordersFeedPage, ordersHistoryPage,
  forgotPasswordPage, resetPasswordPage, profilePage, ingredientDetailsPage } from './utils/global_const';


export default function App() {

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const background = location.state?.background;

  const handleCloseModal = () => navigate(-1)

  useEffect(()=>{
  
    dispatch(getIngredients());

  }, [dispatch]);

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <AppHeader>
            <NavLink to={homePage} style={({ isActive }) => {return isActive ? { color: "white" } : {};}}>
            {({ isActive }) => {
              return (
              <span className={headerStyles.menu__elem}>
                <BurgerIcon type={isActive ? "primary": "secondary"} /> Конструктор
              </span>)
            }}
            </NavLink>
            <NavLink to={ordersFeedPage} style={({ isActive }) => {return isActive ? { color: "white" } : {};}}>
            {({ isActive }) => {
              return (
              <span className={headerStyles.menu__elem}>
                <ListIcon type={isActive ? "primary": "secondary"} /> Лента заказов
              </span>)
            }}
            </NavLink>
        </AppHeader>
      </div>
      <Routes location={background || location}> 
        <Route path="/" element={<MainPage />}/>
        <Route path={registerPage} element={<ProtectedRouteElement onlyUnAuth={true} element={<RegisterPage />}/>}/>
        <Route path={loginPage} element={<ProtectedRouteElement onlyUnAuth={true} element={<LoginPage />}/>}/>
        <Route path={forgotPasswordPage} element={<ProtectedRouteElement onlyUnAuth={true} element={<ForgotPasswordPage />}/>}/>
        <Route path={resetPasswordPage} element={<ProtectedRouteElement onlyUnAuth={true} element={<ResetPasswordPage />}/>}/>
        <Route path={profilePage} element={<ProtectedRouteElement element={<ProfilePage />} />}>
          <Route index element={<Profile />} />
          <Route path={ordersHistoryPage} element={null} />
        </Route>
        <Route path={`${ingredientDetailsPage}/:id`} element={
          <div className={styles.ingredient_container}>
            <div className={styles.ingredient_header}>
              <p className="text text_type_main-medium">Детали ингредиента</p>
            </div>
            <IngredientDetails />
          </div>
        }/>
        <Route path="*" element={<NotFoundPage />}/>
      </Routes>
      { background &&
      <Routes>
        <Route path={`${ingredientDetailsPage}/:id`} element={
          <Modal header="Детали ингредиента" onClose={handleCloseModal}>
            <IngredientDetails />
          </Modal>}/>
      </Routes>
      }
    </div>
  );
}

