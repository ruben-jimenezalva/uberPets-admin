
import React from "react";
import { Button, Form, FormGroup, ControlLabel, FormControl, InputGroup } from "react-bootstrap";
import Calendar from 'react-calendar';

import "./FiltersDriver.css"

export default class FiltersDriver extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            patent: "",
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

    erasePatent(){
        this.setState({patent:""});
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
                    <FormGroup controlId="patent" onChange={this.handleChange}>
                        <ControlLabel id={this.state.value}>Patente</ControlLabel>{' '}
                        <InputGroup>
                        <FormControl type="text" value={this.state.patent}/>
                        <InputGroup.Addon onClick={this.erasePatent.bind(this)}>x</InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                </div>

                <div class="columnDriver">            
                    <FormGroup controlId="status" onChange={this.handleChange}>
                        <ControlLabel id={this.state.value}>Estado</ControlLabel>{' '}
                        <InputGroup>
                        <FormControl type="text" value={this.state.status}/>
                        <InputGroup.Addon onClick={this.eraseStatus.bind(this)}>x</InputGroup.Addon>
                        </InputGroup>
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
                            <Button bsStyle="primary" block>Aplicar Filtros</Button>
                    </div>
                </div>

            </div>
      );
    }
}
