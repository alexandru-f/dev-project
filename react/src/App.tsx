import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Navbar from './layout/navbar/Navbar';
import { getAccessToken, getUserInfoFromJwt } from './Helpers/Helpers';
import RootRoutes from './app/RootRoutes';

const App:React.FC = props => {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <RootRoutes />
      </BrowserRouter>  
    </div>
  );
}

export default App;
