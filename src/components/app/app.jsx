import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import React from 'react';
import { useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { config } from 'utils/constants.js';
import { setIngredients } from 'services/reducers/ingredients';
import { selectIngredient, selectBuns, increaseIngredientCount } from 'services/reducers/select-ingredients';


function App() {
  const dispatch = useDispatch();

  const handleDrop = ({ ingredient }) => {
    if (ingredient.type === 'bun') {
      dispatch(selectBuns(ingredient));
    } else {
      dispatch(selectIngredient(ingredient));
      dispatch(increaseIngredientCount(ingredient._id));
    }
  };

  const getIngredients = React.useCallback(
    () => {
      fetch(config.getIngredientsUrl)
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            return Promise.reject(res.statusText);
          }
        })
        .then(({ data }) => {
          dispatch(setIngredients(data));
        })
        .catch(e => {
          console.warn('Error in getIngredients method: ', e);
        });
    },
    [dispatch]
  );

  React.useEffect(() => {
    getIngredients();
  }, [getIngredients]);

  return (
    <div
    className={appStyles.app}>
      <AppHeader/>

      <main
      className={appStyles['app__main-content']}>
       <DndProvider backend={HTML5Backend}>
         <BurgerIngredients/>

         <BurgerConstructor
         onDropHandler={handleDrop}/>
       </DndProvider>
      </main>
    </div>
  );
}

export default App;
