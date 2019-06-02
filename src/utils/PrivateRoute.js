import React from "react";
import Auth from "./auth";
import {Route, Redirect} from 'react-router-dom';


export default ({ component: Component, ...rest}) =>
    <Route {...rest} render={(props) => (
           Auth.isAuthenticated()
           ? <Component {...props} />
           : <Redirect to='/' 
           />)} 
    />;


