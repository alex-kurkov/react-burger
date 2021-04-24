import styles from './app.module.css';
import { AppHeader } from '../header/app-header';
import Main from '../../components/main/main';
import data from '../../utils/data'

function App() {
  return (
    <div className={styles.app} >
      <AppHeader />
      <Main data={data}/>
    </div>
  );
}

export default App;
