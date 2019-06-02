import React from 'react';
import { Link } from 'react-router-dom';
import Auth from "./utils/auth";
//import './Header.css';

const SignIn = "Iniciar Sesión";
const SignOut = "Cerrar Sesión";
const AppName = "UberPets";
const travels = "Viajes";
const drivers = "Choferes";
const users = "Usuarios";

const LoggedOutView = props => {
    if (!Auth.isAuthenticated()) {
        return (
            <ul className="nav navbar-nav navbar-right">
                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        Home
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                        {SignIn}
                    </Link>
                </li>
            </ul>
        );
    }
    return null;
};


const handleLogout = async event => {
    Auth.clearSession();
    //agregado
    window.location.reload(false); 
};

const LoggedInView = props => {

    if (Auth.isAuthenticated()) {
        return (
            <ul className="nav navbar-nav navbar-right">
                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        Home
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/travels" className="nav-link">
                        {travels}
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/drivers" className="nav-link">
                        {drivers}
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/users" className="nav-link">
                        {users}
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/" className="nav-link" onClick={handleLogout}>
                        {SignOut}
                    </Link>
                </li>
            </ul>
        );
    }

    return null;
};

class Header extends React.Component {
    render() {
        return (
            <div className="AppcontainerHeader">

                <nav className="navbar navbar-light">
                    <div className="containerHeader">

                        <Link to="/" className="navbar-brand">
                            {AppName}
                        </Link>
                        <LoggedOutView />
                        <LoggedInView />

                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;

//navbar navbar-light