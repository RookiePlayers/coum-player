import { Provider } from 'react-redux'
import './App.css';
import { store } from './store/store';
import { Alignment, Column } from 'ruki-react-layouts';
import { CoumPlayer } from './CoumPlayer';
import { PrimeReactProvider } from 'primereact/api';

function App() {
  return (
    <Provider store={store}>
      <PrimeReactProvider>
        <Column alignment={Alignment.center} crossAlignment={Alignment.center}>
          <CoumPlayer height={100} width={400}/>
        </Column>
        </PrimeReactProvider>
      </Provider>
  );
}
 
export default App;
