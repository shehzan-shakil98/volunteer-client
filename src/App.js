import React, { createContext, useState } from 'react';
import './App.css';
import Home from './component/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Register from './component/Register/Register';
import TaskEvent from './component/TaskEvent/TaskEvent';
import Admin from './component/Admin/Admin';
import LogIn from './component/LogIn/LogIn';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';
import NoMatch from './component/NoMatch/NoMatch';
import Donation from './component/Donation/Donation';


export const Context = createContext();

function App() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    title: '',
    id:''
  })
  return (
    <Context.Provider value={[user, setUser]}>
          <div className="App">
      <Router>
        <Switch>
          <PrivateRoute path="/register">
            <Register></Register>
          </PrivateRoute>
          <Route path="/login">
            <LogIn></LogIn>
          </Route>
          <Route exact path="/">
            <Home></Home>
          </Route >
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route path="/eventTask">
            <TaskEvent></TaskEvent>
          </Route>
          <Route path="/admin">
            <Admin></Admin>
            </Route>
            <Route path="/donation">
              <Donation></Donation>
            </Route>
            <Route path="/events">
              <Donation></Donation>
            </Route>
            <Route path="/blog">
              <Donation></Donation>
            </Route>
            <Route path="*">
              <NoMatch></NoMatch>
            </Route>
        </Switch>
      </Router>
    </div>
    </Context.Provider>
  );
}

export default App;
