import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';

function App() {
  return (
    <div className={appStyles.app}>
      <AppHeader/>
    </div>
  );
}

export default App;
