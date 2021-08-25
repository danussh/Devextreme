import './App.css';
import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { LoginContext } from './Helpers/Context';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard.js/Dashboard';
import NotFound from './NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import Setting from './components/Dashboard.js/Sidenavcomp/Setting';

function App() {
  const [Loggedin, setLoggedin] = useState('');

  return (
    <LoginContext.Provider value={{ Loggedin, setLoggedin }}>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route
          exact
          path='/dashboard'
          component={() => <Dashboard Loggedin={Loggedin} />}
        />
        <Route exact path='/Setting' component={Setting} />
        <Route path='*' component={NotFound} />
      </Switch>
     </LoginContext.Provider>
  );
}

export default App;
