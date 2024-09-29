import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

function App() {
  return (
    <div
    className={appStyles.app}>
      <AppHeader/>

      <main
      className={appStyles['app__main-content']}>
        <BurgerIngredients/>
      </main>
    </div>
  );
}

export default App;
