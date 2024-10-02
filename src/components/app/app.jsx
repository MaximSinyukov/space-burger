import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';

import React from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import { config } from 'utils/constants.js';


function App() {
  const [ingredients, setIngredients] = React.useState([]);

  const getIngredients = () => {
    fetch(config.baseUrl)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.statusText);
        }
      })
      .then(({ data }) => {
        setIngredients(data);
      })
      .catch(e => {
        console.warn('Error in getIngredients method: ', e);
      });
  };

  React.useEffect(() => {
    getIngredients();
  }, []);

  return (
    <div
    className={appStyles.app}>
      <AppHeader/>

      <main
      className={appStyles['app__main-content']}>
        <BurgerIngredients
        ingredients={ingredients}/>

        <BurgerConstructor
        ingredients={ingredients}/>
      </main>
    </div>
  );
}

export default App;
