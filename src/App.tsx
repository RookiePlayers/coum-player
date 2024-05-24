import { Provider } from 'react-redux'
import './App.css';
import { store } from './store/store';
import { Alignment, Column } from 'ruki-react-layouts';
import { CoumPlayer } from './CoumPlayer';
import { PrimeReactProvider } from 'primereact/api';
import { InitialMusicPlayerContextState, MusicPlayerContext } from './provider/music_player_provider';
import { AuthProvider } from './provider/auth_provider';

export const parseUrlForQueryParams = (url: string)=>{
  const urlSplit = url.split('/');
 const mainPath = urlSplit[urlSplit.length - 1];
 const idSplit = mainPath.split('?');
 const query = idSplit[idSplit.length - 1];
 const params = query.split('&');
 const result:{[key: string]: string} = {}
 for(const p of params){
     const temp = p.split('=');
     result[`${temp[0]}`] = temp[1];
 }
 return result;
}

function App() {
  const params = parseUrlForQueryParams(window.location.href);
  console.log(params);
  const width = params['width'] ? parseInt(params['width']) : 400;
  const height = params['height'] ? parseInt(params['height']) : 100;
  return (
    <Provider store={store}>
      <PrimeReactProvider>
        <AuthProvider>
          <MusicPlayerContext.Provider value={InitialMusicPlayerContextState}>
          <Column alignment={Alignment.center} crossAlignment={Alignment.center}>
            <CoumPlayer height={height} width={width}/>
          </Column>
          </MusicPlayerContext.Provider>
        </AuthProvider>
        </PrimeReactProvider>
      </Provider>
  );
}
 
export default App;
