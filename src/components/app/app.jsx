import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { getIngredients } from 'services/actions/ingredientsAction';

function App() {
  const dispatch = useDispatch();

  const getIngredientsList = React.useCallback(
    () => {
      dispatch(getIngredients());
    },
    [dispatch]
  );

  React.useEffect(() => {
    getIngredientsList();
  }, [getIngredientsList]);

  return (
    <div
    className={appStyles.app}>
      <AppHeader/>

      <main
      className={appStyles['app__main-content']}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients/>

                <BurgerConstructor/>
              </DndProvider>
            } />

            <Route path="/login" element={<div>login</div>} />

            <Route path="/forgot-password" element={<div>forgot-password</div>} />

            <Route path="/reset-password" element={<div>reset-password</div>} />

            <Route path="/register" element={<div>register </div>} />

            <Route path="/profile " element={<div>profile </div>} />

            <Route path="/ingredients/:id" element={<div>ingredients</div>} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
