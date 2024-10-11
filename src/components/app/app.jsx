import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import React from 'react';
import { useDispatch } from 'react-redux';

import { config } from 'utils/constants.js';
import { setIngredients } from 'services/reducers/ingredients';


function App() {
  const dispatch = useDispatch();

  const getIngredients = React.useCallback(
    () => {
      fetch(config.baseUrl)
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
        <BurgerIngredients/>

        <BurgerConstructor/>
      </main>
    </div>
  );
}

export default App;
