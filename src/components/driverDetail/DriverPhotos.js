import React from "react";
import { Carousel, Button } from "react-bootstrap";
import imageCarDefault from "./auto.jpg";
import "./DriverPhotos.css";

import Axios from "axios";
import ApiLinks from "../../utils/ApiLinks";
import Auth from "../../utils/auth";

class DriverPhotos extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            imageCar:imageCarDefault,
            imageInsurance:imageCarDefault,
            imageLicense:imageCarDefault,
        }
    }

    componentWillMount(){
        this.getAllImages();
    }


    getAllImages(){
        let driverId = "driverId="+this.props.match.params.id;
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


    render() {
        return (
            <div className="photosDriver">
                <Button bsSize="medium" href="javascript:history.go(-1)" className="buttonBack" bsStyle="primary" >volver</Button>
                <br/>
                <br/>
                <Carousel>
                    <Carousel.Item>
                        <img width={600} height={100} alt="900x400" src={this.state.imageCar} />
                        <Carousel.Caption>
                        <h3>Imagen del Auto</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img width={600} height={400} alt="900x400" src={this.state.imageInsurance} />
                        <Carousel.Caption>
                        <h3>Imagen del Seguro</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img width={600} height={400} alt="900x400" src={this.state.imageLicense} />
                        <Carousel.Caption>
                        <h3>Imagen de la Licencia</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        );
    }
}

  export default (DriverPhotos);
