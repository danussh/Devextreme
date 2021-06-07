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

  // const [change, setchange] = useState("")
  // const [arr, setarr] = useState([])

  // const clickme = ()=>{
  //   setarr([...arr,change])
  //   setchange("")
  // }
  // const deletedata = (index)=>{
  //   console.log(index);
  //   setarr(arr.filter((val,i)=>{
  //     return i!==index
  //   }))
  // }
  // const editdata = (index)=>{
  //   var data = prompt("enter data to be edited")
  //   setarr( arr.map((val,i)=>{
  //     return i===index?data:val
  //   }))
  // }
  return (
    // <>
    // <input type="text" onChange={(e)=>setchange(e.target.value)} value={change}/>
    // <button onClick={clickme}>Click me</button>
    // {
    //   arr.map((val,i)=>{
    //     return <li key={i}>{val}<button onClick={()=>deletedata(i)}>Delete</button><button onClick={()=>editdata(i)}>edit</button></li>
    //   })
    // }
    // </>
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
