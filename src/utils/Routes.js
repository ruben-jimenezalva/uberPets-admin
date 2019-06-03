import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Home from '../components/home/Home';
import Login from '../components/login/Login';
import Travel from '../components/travels/TravelApp';
import Driver from '../components/drivers/DriverApp';
export default ()=>
  <Switch>
    <Route path="/login" exact component={Login} />
    <Route path="/" exact component={Home} />
    <PrivateRoute path="/travels" exact component={Travel} />
    <PrivateRoute path="/drivers" exact component={Driver} />
  </Switch>;


