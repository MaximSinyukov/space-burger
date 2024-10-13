import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import React from 'react';
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
       <DndProvider backend={HTML5Backend}>
         <BurgerIngredients/>

         <BurgerConstructor/>
       </DndProvider>
      </main>
    </div>
  );
}

export default App;
