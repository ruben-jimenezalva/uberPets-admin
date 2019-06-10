import React from "react";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import StarRatings from 'react-star-ratings';
import "./ProfileDriver.css";
import imageProfileDefault from "./koala.png";
import imageCarDefault from "./auto.jpg";
import Axios from "axios";
import ApiLinks from "../../utils/ApiLinks";
import Auth from "../../utils/auth";

const styleButtonAvailable = "success";
const styleButtonDisable = "danger";
const nameButtonAvailable = "habilitar";
const nameButtonDisable = "deshabilitar";
const statusDesabled = "deshabilitado";
const maxStars = 5;

class ProfileDriver extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            valueRating:3.5,
            name:"Agusto Linares",
            phone:"11356-7890",
            dni:"18990235",
            styleButton:styleButtonAvailable,
            nameButton:nameButtonAvailable,
            imageProfile:imageProfileDefault,
            imageLicense:imageCarDefault,
            imageInsurance:imageCarDefault,
            imageCar:imageCarDefault,
        }
    }

    componentWillMount(){
        this.getInfoDriver();
        this.getAllImages();
    }


    getAllImages(){
        let driverId = "driverId="+this.props.driverId;
        var path =ApiLinks.Documents+"/?"+driverId;

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
                        case "license":
                            currentComponent.setState({imageLicense:"data:image/png;base64, "+element.data});
                            break;

                        case "profile":
                            currentComponent.setState({imageProfile:"data:image/png;base64, "+element.data});
                            break;

                        case "insurance":
                            currentComponent.setState({imageInsurance:"data:image/png;base64, "+element.data});
                            break;

                        case "car":
                            currentComponent.setState({imageCar:"data:image/png;base64, "+element.data});
                            break;
                    }
                });
            })
            .catch(function (error) {
                console.log(error);
                currentComponent.setState({responseError: true});                
            });
    }

    getInfoDriver(){

        var path =ApiLinks.Drivers+"/?driverId="+this.props.driverId

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
                currentComponent.setState({valueRating:score});

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
            <div class="row" className="rowDetailDriver">
                <div class="columnDetailDriver">            
                    <Image className="imageProfile"src={this.state.imageProfile} circle/>
                </div>
                <div class="columnDetailDriver">

                    <div class="informationDriver">
                        <h3>{this.state.name}</h3>
                        <br/>
                        <h5>telf: {this.state.phone}</h5>
                        <h5>dni: {this.state.dni}</h5>
                        <br/>
                        <Button bsStyle={this.state.styleButton} onClick={this.handleButtonDisable.bind(this)} block>
                            {this.state.nameButton}
                        </Button>
                    </div>         
                </div>

                <div class="columnDetailDriver">
                    <div className="ratingColum">
                        <h3 className="rating">{this.state.valueRating}/</h3>
                        <h3>{maxStars}</h3>
                        <StarRatings rating={this.state.valueRating} starRatedColor="#efb810" 
                        starDimension="40px" starSpacing="0px"/>
                    </div>
                </div>

                <div class="columnDetailDriver">            
                    <Image className="imageCar" src={this.state.imageCar} rounded alt="171x180"/>  
                </div>

                <div class="columnDetailDriver">            
                    <div className="buttons">
                        <Button bsSize="xsmall" href="javascript:history.go(-1)" className="buttonBack" bsStyle="primary" >volver</Button>
                        <br/><br/><br/><br/>
                        <Button  bsSize="small" bsStyle="success" block>Ver ubicación</Button>   
                        <br/>
                        <Button bsSize="small" bsStyle="success" block >
                            <Link to={{ pathname:'/drivers/photos/'+this.props.driverId}} 
                                className="linkPhotos">
                                Ver Fotos
                            </Link>
                        </Button>    
                    </div>                    
                </div>
            </div>
        );
    }
}

export default (ProfileDriver);
