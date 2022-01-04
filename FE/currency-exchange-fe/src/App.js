import './App.css';
import {Provider, useSelector} from 'react-redux';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import LoginScreen from "./componetns/Login/Login";
import RegisterScreen from './componetns/Register/Register';
import DashboardScreen from './componetns/Dashboard/Dashboard';
import CurrencyScreen from './componetns/Currency/Currency';
import {isLoggedIn, store} from './services/ExchangeState';
import React from "react";


function App() {
  
  return (
      <Provider store={store}>
          <Router>
              <Switch>
                  <Redirect exact from="/" to="login" />
                  <Route path={["/login"]}>
                      <LoginScreen />
                  </Route>
                  <Route path="/register">
                      <RegisterScreen />
                  </Route>
                  <PrivateRoute path="/dash">
                      <DashboardScreen />
                  </PrivateRoute>
                  <PrivateRoute path="/currency">
                      <CurrencyScreen />
                  </PrivateRoute>
              </Switch>
          </Router>
      </Provider>
  );
}

function PrivateRoute({ children, ...rest }) {
  const loggedIn = useSelector(isLoggedIn)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
export default App;
