import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Axios from "axios";
import "./Login.css";
import Auth from "../../utils/auth";
var ApiLinks = require("../../utils/ApiLinks");

const SignIn = "Iniciar Sesión";
const nameButtonLogin =  "Ingresar"

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        };
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }


    handleSubmit = async event => {
        /*event.preventDefault();
        Axios.post(ApiLinks.Login,
            { username: this.state.username, password: this.state.password })
            .then(res => {
                Auth.setToken(res.data.token.token, false);
                Auth.setUserInfo(this.state.username, false);
                this.redirectUser();
            })
            .catch(error => {
                alert("Error to Login");
            })*/
        if (this.state.username === "admin" && this.state.password === "admin") {
            event.preventDefault();
            Auth.setToken("res.data.token.token", false);
            Auth.setUserInfo(this.state.username, false);
            this.redirectUser();
        }
        else{
            alert("El usuario o la contraseña son incorrectos, vuelva a intentarlo");
        }
    }

    redirectUser = () => {
        Auth.enableAuthentication();
        this.props.history.push("/home");
        //agregado
        window.location.reload(true); 
    };

    render() {
        return (
            <div className="Login">
                <h1 className="titleLogin">{SignIn}</h1>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="username" bsSize="large">
                        <ControlLabel>Usuario</ControlLabel>
                        <FormControl
                            autoFocus
                            type="username"
                            value={this.state.username}
                            onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Contraseña</ControlLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password" />
                    </FormGroup>
                    <Button bsStyle="primary"
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit">
                        {nameButtonLogin}
                    </Button>
                </form>
            </div>
        );
    }



}