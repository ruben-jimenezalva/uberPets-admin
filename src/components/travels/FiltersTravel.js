
import React from "react";
import { Button, Form, FormGroup, ControlLabel, FormControl, InputGroup } from "react-bootstrap";
import Calendar from 'react-calendar';

import "./FiltersTravel.css"

const statusOnTravel = "en viaje";
const statusFinish = "finalizado";
const statusCanceled = "cancelado";

export default class FiltersTRavel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateTo: "",
            dateFrom: "",
            status:"",
            userId: "",
            driverId: "",
            showCalendarFrom:false,
            showCalendarTo:false,
        }
    }

    onChangeFrom = date => {
        this.setState({dateFrom:date});
        this.setState({showCalendarFrom:false});
        this.setState({dateFrom:date});
    }

    onChangeTo = date => {
        this.setState({dateTo:date});
        this.setState({showCalendarTo:false})
        this.setState({dateTo:date})

    }

    onCellEdit(row) {
        this.setState({row:row});
    }

    handleClickCalendarFrom(){
        this.setState({showCalendarFrom:true});
    }

    handleClickCalendarTo(){
        this.setState({showCalendarTo:true});
    }

    
    onChangeDataDriver = event =>{
        event.preventDefault();
        this.setState({driverId:event.target.value});
    }

    onChangeDataUser = event =>{
        event.preventDefault();
        this.setState({userId:event.target.value});
    }

    onChangeStatus= event =>{
        event.preventDefault();
        this.setState({status:event.target.value});
    }

    eraseDateTo(){
        this.setState({dateTo:""});
    }

    eraseDateFrom(){
        this.setState({dateFrom:""});
    }

    eraseDataUser(){
        this.setState({userId:""});
    }

    eraseDataDriver(){
        this.setState({driverId:""});
    }

    handleDone() {
        this.props.applyFilters(
            {
                "dateTo":this.state.dateTo,
                "dateFrom":this.state.dateFrom,
                "status":this.state.status,
                "userId":this.state.userId,
                "driverId":this.state.driverId
            }
        );
    }

    render() {
        return (
            <div class="row" className="rowFiltersTravel">

                <div class="columnTravel">
                    <FormGroup>
                        <ControlLabel id={this.state.value}>Fecha Desde</ControlLabel>{' '}
                        <InputGroup>
                        <FormControl type="text" 
                            onClick={this.handleClickCalendarFrom.bind(this)}
                            value={this.state.dateFrom==""?"":
                                this.state.dateFrom.getDate()+
                            "/"+this.state.dateFrom.getMonth()+
                            "/"+this.state.dateFrom.getFullYear()}/>
                        <InputGroup.Addon onClick={this.eraseDateFrom.bind(this)}>x</InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                    <div>
                        { this.state.showCalendarFrom ? 
                            <Calendar
                                id="CalendarFrom"
                                onChange={this.onChangeFrom}
                                value={this.state.dateFrom}/> 
                            : null 
                        }
                    </div>
                </div>

                <div class="columnTravel">
                    <FormGroup>
                        <ControlLabel id={this.state.value}>Fecha Hasta</ControlLabel>{' '}
                        <InputGroup>
                        <FormControl type="text" 
                            onClick={this.handleClickCalendarTo.bind(this)}
                            value={this.state.dateTo==""?"":
                                this.state.dateTo.getDate()+
                                "/"+this.state.dateTo.getMonth()+
                                "/"+this.state.dateTo.getFullYear()}/>
                        <InputGroup.Addon onClick={this.eraseDateTo.bind(this)}>x</InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                    <div>
                        { this.state.showCalendarTo ? 
                            <Calendar
                                id="CalendarFrom"
                                onChange={this.onChangeTo}
                                value={this.state.date}/> 
                            : null 
                        }
                    </div>
                </div>
    

                <div class="columnTravel">            
                    <FormGroup
                        controlId="status_payment"
                        value={this.state.id_payments}
                        onChange={this.onChangeStatus}
                        type="text" >
                        <ControlLabel id={this.state.value}>Estado</ControlLabel>{' '}
                        <FormControl componentClass="select" value={this.state.status_payment}>
                            <option value="">{"seleccione"}</option>
                            <option value={statusOnTravel}>{statusOnTravel}</option>
                            <option value={statusFinish}>{statusFinish}</option>
                            <option value={statusCanceled}>{statusCanceled}</option>
                        </FormControl>
                    </FormGroup>
                </div>

                <div class="columnTravel">            
                    <FormGroup>
                        <ControlLabel id={this.state.value}>Chofer</ControlLabel>{' '}
                        <InputGroup>
                        <FormControl type="text" value={this.state.driverId} onChange={this.onChangeDataDriver}/>
                        <InputGroup.Addon onClick={this.eraseDataDriver.bind(this)}>x</InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                </div>

                <div class="columnTravel">            
                    <FormGroup>
                        <ControlLabel id={this.state.value}>Usuario</ControlLabel>{' '}
                        <InputGroup>
                        <FormControl type="text" value={this.state.userId} onChange={this.onChangeDataUser}/>
                        <InputGroup.Addon onClick={this.eraseDataUser.bind(this)}>x</InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                </div>

                <div class="columnTravel">
                    <div className="buttonApply">
                            <Button bsStyle="primary" type="submit" block onClick={this.handleDone.bind(this)}>Aplicar Filtros</Button>
                    </div>
                </div>

            </div>
      );
    }
}
