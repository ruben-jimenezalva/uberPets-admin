import React, {Component} from "react";
//import { SideNav, Nav } from 'react-sidenav';
import "./Home.css";
import Banner from "./Banner";
import Auth from "../../utils/auth";

class Home extends Component{
    render(){
        if(Auth.isAuthenticated()){
            return(
                <div className ="Home">
                    <Banner />
                    <form>
                        <h3 className="HomeLoggedIn">
                            Bienvenido a UberPets {Auth.getUserInfo()}
                        </h3>
                    </form>
                </div>
            );
        }
        return(
            <div className ="Home">
                <Banner />
            </div>
        );
    }
}

export default Home;
