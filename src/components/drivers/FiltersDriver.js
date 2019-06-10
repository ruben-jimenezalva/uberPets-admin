
import React from "react";
import { Button, Form, FormGroup, ControlLabel, FormControl, InputGroup } from "react-bootstrap";
import Calendar from 'react-calendar';

import "./FiltersDriver.css"

const statusAvailable = "disponible";
const statusDisabled = "deshabilitado";
const statusEnabled = "habilitado";
const statusOffline= "desconectado";

export default class FiltersDriver extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            plate: "",
            status: "",
            minScore: "",
            maxScore: "",
        }
    }

    handleChange = event => {
        event.preventDefault();
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleChangeName = event => {
        event.preventDefault();
        this.setState({name: event.target.value});
    }

    eraseName(){
        this.setState({name:""});
    }

    erasePlate(){
        this.setState({plate:""});
    }

    eraseStatus(){
        this.setState({status:""});
    }

    eraseMinScore(){
        this.setState({minScore:""});
    }

    eraseMaxScore(){
        this.setState({maxScore:""});
    }

    handleDone() {
        this.props.applyFilters(
            {
                "name":this.state.name,
                "status":this.state.status,
                "plate":this.state.plate,
                "minScore":this.state.minScore,
                "maxScore":this.state.maxScore
            }
        );
    }


    render() {
        return (
            <div class="row" className="rowFiltersDriver">

                <div class="columnDriver">            
                    <FormGroup controlId="name" onChange={this.handleChange}>
                        <ControlLabel id={this.state.value}>Nombre</ControlLabel>{' '}
                        <InputGroup>
                        <FormControl type="text" value={this.state.name} />
                        <InputGroup.Addon onClick={this.eraseName.bind(this)}>x</InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                </div>

                <div class="columnDriver">            
                    <FormGroup controlId="plate" onChange={this.handleChange}>
                        <ControlLabel id={this.state.value}>Patente</ControlLabel>{' '}
                        <InputGroup>
                        <FormControl type="text" value={this.state.plate}/>
                        <InputGroup.Addon onClick={this.erasePlate.bind(this)}>x</InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                </div>

                <div class="columnDriver">            
                <FormGroup
                        controlId="status"
                        onChange={this.handleChange}
                        type="text" >
                        <ControlLabel id={this.state.value}>Estado</ControlLabel>{' '}
                        <FormControl componentClass="select">
                            <option value="">{"seleccione"}</option>
                            <option value={statusAvailable}>{statusAvailable}</option>
                            <option value={statusDisabled}>{statusDisabled}</option>
                            <option value={statusEnabled}>{statusEnabled}</option>
                            <option value={statusOffline}>{statusOffline}</option>
                        </FormControl>
                    </FormGroup>
                </div>

                <div class="columnDriver">            
                    <FormGroup controlId="minScore" onChange={this.handleChange}>
                        <ControlLabel id={this.state.value}>Puntaje mínimo</ControlLabel>{' '}
                        <InputGroup>
                        <FormControl type="number" step="0.01" value={this.state.minScore}/>
                        <InputGroup.Addon onClick={this.eraseMinScore.bind(this)}>x</InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                </div>

                <div class="columnDriver">            
                    <FormGroup controlId="maxScore" onChange={this.handleChange}>
                        <ControlLabel id={this.state.value}>Puntaje máximo</ControlLabel>{' '}
                        <InputGroup>
                        <FormControl type="number" step="0.01" value={this.state.maxScore} onChange={this.onChangeDataUser}/>
                        <InputGroup.Addon onClick={this.eraseMaxScore.bind(this)}>x</InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                </div>

                <div class="columnDriver">
                    <div className="buttonApply">
                        <Button bsStyle="primary" type="submit" block onClick={this.handleDone.bind(this)}>Aplicar Filtros</Button>                        
                    </div>
                </div>

            </div>
      );
    }
}
