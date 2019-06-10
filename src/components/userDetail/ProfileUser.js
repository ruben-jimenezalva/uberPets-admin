import React from "react";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import StarRatings from 'react-star-ratings';
import "./ProfileUser.css";
import imageProfileDefault from "./koala.png";
import Axios from "axios";
import ApiLinks from "../../utils/ApiLinks";
import Auth from "../../utils/auth";

const styleButtonAvailable = "success";
const styleButtonDisable = "danger";
const nameButtonAvailable = "habilitar";
const nameButtonDisable = "deshabilitar";
const statusDesabled = "deshabilitado";
const maxStars = 5;
//const urlLocation = 'http://www.google.com/maps/search/?api=1&query=36.26577,-92.54324'
const urlLocation = 'http://www.google.com/maps/search/?api=1&query=';

class ProfileUser extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            valueRating:3.5,
            name:"Agusto Linares",
            location:"",
            status:"",
            styleButton:styleButtonAvailable,
            nameButton:nameButtonAvailable,
            imageProfile:imageProfileDefault,
        }
    }

    componentWillMount(){
        this.getInfoUser();
        this.getAllImages();
    }


    getAllImages(){
        let userId = "userId="+this.props.userId;
        var path =ApiLinks.Documents+"/?"+userId;

        this.setState({responseError: false});

        var config = {
            headers: { 'Authorization':Auth.getToken() }
        };

        let currentComponent = this;

        Axios
            .get(path, config)
            .then(function (response) {
                response.data.forEach(element => {
                    switch (element.name) {
                        case "profile":
                            currentComponent.setState({imageProfile:"data:image/png;base64, "+element.data});
                            break;
                    }
                });
            })
            .catch(function (error) {
                console.log(error);
                currentComponent.setState({responseError: true});                
            });
    }

    getInfoUser(){

        var path =ApiLinks.Users+"/?userId="+this.props.userId

        this.setState({responseError: false});

        var config = {
            headers: { 'Authorization':Auth.getToken() }
        };

        let currentComponent = this;

        Axios
            .get(path, config)
            .then(function (response) {
                let data = response.data;

                if(data.status == statusDesabled){
                    currentComponent.setState({styleButton:styleButtonAvailable});
                    currentComponent.setState({nameButton:data.nameButtonAvailable});
                }else{
                    currentComponent.setState({styleButton:styleButtonDisable});
                    currentComponent.setState({nameButton:nameButtonDisable});
                }

                let score = data.totalScore;
                if(data.scoreQuantity != 0)
                    score /= data.scoreQuantity;
                score = Number((score).toFixed(1));
                currentComponent.setState({valueRating:score});

                currentComponent.setState({status:data.status});
                currentComponent.setState({name:data.party.name});
                currentComponent.setState({phone:data.party.phone});
                currentComponent.setState({dni:data.party.dni});

            })
            .catch(function (error) {
                console.log(error);
                currentComponent.setState({responseError: true});                
            });
    }


    handleButtonDisable(){
        alert("hay q deshabilitar");
    }


    render() {
        return (
            <div class="row" className="rowDetailUser">
                <div class="columnDetailUser">            
                    <Image className="imageProfile"src={this.state.imageProfile} circle/>
                </div>
                <div class="columnDetailUser">

                    <div class="informationUser">
                        <br/>
                        <h3>{this.state.name}</h3>
                        <br/>
                    </div>         
                </div>

                <div class="columnDetailUser">
                    <div className="ratingColum">
                        <br/>
                        <h3 className="rating">{this.state.valueRating}/</h3>
                        <h3>{maxStars}</h3>
                        <StarRatings rating={this.state.valueRating} starRatedColor="#efb810" 
                        starDimension="40px" starSpacing="0px"/>
                    </div>
                </div>

                <div class="columnDetailUser">            
                    <div className="buttons">
                        <br/><br/>                        
                        <Button bsSize="small" href="javascript:history.go(-1)" className="buttonBack" bsStyle="primary" >volver</Button>
                        <br/>
                    </div>                    
                </div>
            </div>
        );
    }
}

export default (ProfileUser);
