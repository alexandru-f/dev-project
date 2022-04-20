import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './layout/Layout';
import Dashboard from './layout/dashboard/Dashboard';
import Subscription from './layout/subscription/Subscription'
import Login from './layout/RegisterCompany/RegisterCompany';

const App:React.FC<{}> = props => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="home" element={<Home />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="subscriptions" element={<Subscription />} />
            </Route>
            <Route path="/signup" element={<Login />}/>
        </Routes>
      </BrowserRouter>  
    </div>
  );
}

const Home = () => {
  return (
    <>
      HOME
    </>
  );
}

export default App;
