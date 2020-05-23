import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import './App.css';
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Navbar from "./Components/Navbar";
import PageNotFound from "./Pages/PageNotFound";


function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        rest.isLoggedIn ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/user/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}


export default function App() {
  const [isLoggedIn, setisLogedIn] = useState(localStorage.getItem('id'));

  const logOut = () => {
    localStorage.removeItem('id');
    setisLogedIn(false);
  }


  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} logOut={logOut} />
      <Switch>
        <Route path="/user/login">
          <Login setisLogedIn={setisLogedIn} />
        </Route>
        <Route path="/user/register">
          <Register />
        </Route>
        <PrivateRoute path="/user/profile/:id" isLoggedIn={isLoggedIn}>
          <Profile />
        </PrivateRoute>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="*" >
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
}

