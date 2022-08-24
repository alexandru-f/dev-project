// import './App.css';
import {BrowserRouter} from 'react-router-dom';
import RootRoutes from './app/RootRoutes';

const App:React.FC = props => {
  return (
    <div className="App">
      <BrowserRouter>
        <RootRoutes />
      </BrowserRouter>  
    </div>
  );
}

export default App;
