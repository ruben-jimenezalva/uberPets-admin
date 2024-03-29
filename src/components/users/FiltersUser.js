
import React from "react";
import { Button, Form, FormGroup, ControlLabel, FormControl, InputGroup } from "react-bootstrap";

import "./FiltersUser.css";

const statusAvailable = "disponible";
const statusDisabled = "deshabilitado";
const statusEnabled = "habilitado";
const statusOffline= "desconectado";


export default class FiltersUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
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

    eraseName(){
        this.setState({name:""});
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
                "minScore":this.state.minScore,
                "maxScore":this.state.maxScore
            }
        );
    }

    render() {
        return (
            <div class="row" className="rowFiltersUser">

                <div class="columnUser">            
                    <FormGroup controlId="name" onChange={this.handleChange}>
                        <ControlLabel id={this.state.value}>Nombre</ControlLabel>{' '}
                        <InputGroup>
                        <FormControl type="text" value={this.state.name} />
                        <InputGroup.Addon onClick={this.eraseName.bind(this)}>x</InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                </div>

                <div class="columnUser">            
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

                <div class="columnUser">            
                    <FormGroup controlId="minScore" onChange={this.handleChange}>
                        <ControlLabel id={this.state.value}>Puntaje mínimo</ControlLabel>{' '}
                        <InputGroup>
                        <FormControl type="number" step="0.01" value={this.state.minScore}/>
                        <InputGroup.Addon onClick={this.eraseMinScore.bind(this)}>x</InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                </div>

                <div class="columnUser">            
                    <FormGroup controlId="maxScore" onChange={this.handleChange}>
                        <ControlLabel id={this.state.value}>Puntaje máximo</ControlLabel>{' '}
                        <InputGroup>
                        <FormControl type="number" step="0.01" value={this.state.maxScore} onChange={this.onChangeDataUser}/>
                        <InputGroup.Addon onClick={this.eraseMaxScore.bind(this)}>x</InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                </div>

                <div class="columnUser">
                    <div className="buttonApply">
                        <Button bsStyle="primary" type="submit" block onClick={this.handleDone.bind(this)}>Aplicar Filtros</Button>                            
                    </div>
                </div>

            </div>
      );
    }
}
