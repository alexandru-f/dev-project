import React, { useEffect } from 'react';
import './App.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Admin from './layout/Admin';
import Subscriptions from './views/admin/Subscriptions';
// CSS Import
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/style/tailwind.css";
import Dashboard from './views/admin/Dashboard';


const App:React.FC<{}> = props => {

  useEffect(() => {
    console.log('Loading application'); 
  }, []);

  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/admin" element={<Admin />}>
              <Route path="dashboard" element={<Dashboard/>} />
              <Route path="subscriptions" element={<Subscriptions />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
