import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import Login from 'pages/login/login.jsx';
import ForgotPassword from 'pages/forgot-password/forgot-password.jsx';
import ResetPassword from 'pages/reset-password/reset-password.jsx';
import Register from 'pages/register/register.jsx';
import Profile from 'pages/profile/profile.jsx';
import Ingredient from 'pages/ingredient/ingredient.jsx';
import ProtectedRouteElement from 'components/protected-route-element.jsx';
import IngredientDetails from 'components/ingredient-details/ingredient-details';
import Modal from 'components/modal/modal';

import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { getIngredients } from 'services/actions/ingredientsAction';
import { getUser } from 'services/actions/userActions';
import { getCookie } from 'utils/methods/cookieMethods';
import { removeIngredientDetails } from 'services/reducers/detail-ingredient';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const storedBackground = JSON.parse(localStorage.getItem('background'));
  const background = storedBackground || location.state?.background;

  const handleCloseModal = React.useCallback(
    () => {
      localStorage.removeItem('background');
      dispatch(removeIngredientDetails());
      navigate(-1);
    },
    [dispatch, navigate]
  );

  const getUserData = React.useCallback(
    () => {
      if (getCookie('token')) {
        dispatch(getUser());
      }
    },
    [dispatch]
  );

  const getIngredientsList = React.useCallback(
    () => {
      dispatch(getIngredients());
    },
    [dispatch]
  );

  React.useEffect(() => {
    getUserData();
    getIngredientsList();
  }, [getIngredientsList, getUserData]);

  return (
    <div
    className={appStyles.app}>
      <AppHeader/>

      <main
      className={appStyles['app__main-content']}>
        <Routes location={background || location}>
          <Route path="/" element={
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients/>

              <BurgerConstructor/>
            </DndProvider>
          } />

          <Route
          path="/login"
          element={
            <ProtectedRouteElement type="anonymous" element={<Login/>}/>
          }/>

          <Route
          path="/forgot-password"
          element={
            <ProtectedRouteElement type="anonymous" element={<ForgotPassword/>}/>}
          />

          <Route
          path="/reset-password"
          element={
            <ProtectedRouteElement type="anonymous" element={<ResetPassword/>}/>
          }/>

          <Route
          path="/register"
          element={
            <ProtectedRouteElement type="anonymous" element={<Register/>}/>
          }/>

          <Route
          path="/profile"
          element={
            <ProtectedRouteElement element={<Profile />}/>
          }/>

          <Route
          path="/profile/orders"
          element={
            <ProtectedRouteElement element={<Profile />}/>
          }/>

          <Route path="/ingredients/:id" element={<Ingredient/>} />
        </Routes>
      </main>

      {background && (
        <Routes>
          <Route path="/ingredients/:id" element={
            <Modal
            header="Детали ингредиента"
            onClose={handleCloseModal}>
              <IngredientDetails/>
            </Modal>
          } />
        </Routes>
      )}
    </div>
  );
}

export default App;
