import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Home from '../components/home/Home';
import Login from '../components/login/Login';
import Travel from '../components/travels/TravelApp';
import User from '../components/users/UserApp';
import Driver from '../components/drivers/DriverApp';
export default ()=>
  <Switch>
    <Route path="/" exact component={Login} />
    <PrivateRoute path="/home" exact component={Home} />
    <PrivateRoute path="/travels" exact component={Travel} />
    <PrivateRoute path="/users" exact component={User} />
    <PrivateRoute path="/drivers" exact component={Driver} />
  </Switch>;


