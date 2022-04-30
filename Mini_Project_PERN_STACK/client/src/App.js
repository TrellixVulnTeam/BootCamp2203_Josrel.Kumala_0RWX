import React, { Fragment, useState, useEffect,component } from "react";
import "./App.css";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Thread from "./components/Thread";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      const response = await fetch("http://localhost:3001/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      console.log(parseRes);

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    isAuth();
  }, []);
  return (
    <Fragment>
      <BrowserRouter>
        <div className="container">
          <Switch>
            <Route
              exact
              path="/login"
              render={(props) =>
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  // <Redirect to="/dashboard" />
                  (window.location = "/dashboard")
                )
              }
            />
            <Route
              exact
              path="/register"
              render={(props) =>
                !isAuthenticated ? (
                  <Register {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/dashboard"
              render={(props) =>
                isAuthenticated ? (
                  <Dashboard {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route path="/thread/:id" component={Thread}/>
          </Switch>
        </div>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
