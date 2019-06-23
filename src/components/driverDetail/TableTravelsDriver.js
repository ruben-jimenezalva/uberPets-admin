import React from 'react';
import Axios from "axios";
import ApiLinks from "../../utils/ApiLinks";
import Auth from "../../utils/auth";
import {Alert} from 'react-bootstrap';

import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

var ReactBsTable  = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;

export default class DriverTravelsTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = { travels: "",
            responseError: false,
            responseSuccessfully: false,
        };
    }

    componentWillMount() {

        let driverId = "driverId="+this.props.driverId;
        var path =ApiLinks.Travels+"/?"+driverId;

        this.setState({responseError: false});
        var config = {
            headers: { 'Authorization':Auth.getToken() }
        };

        let currentComponent = this;

        Axios
            .get(path, config)
            .then(function (response) {
                currentComponent.setState({travels: response.data});
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
                currentComponent.setState({responseError: true});                
            });
    }


    cellButton(cell, row, enumObject, rowIndex) {
        return (
            <button type="button" title="Edit Travel" className="btn btn-success" onClick={() => this.onClickEditTravel(cell, row, rowIndex)}>
                Edit
            </button>
        )
     }

    indexNumber(cell, row, enumObject, rowIndex) { return (<div>{rowIndex + 1}</div>) }

    showNameLocation(cell, row) {
        return cell.name;
    }

    showDateFormat(cell, row) {
        let date = new Date(cell);
        let month = date.getMonth()+1;
        let hour = date.getHours()+":"+date.getMinutes();
        let dateShow = date.getDate()+"/"+month+"/"+date.getFullYear();
        return  dateShow + "  -  "+hour+ " hs";
    }
    
    render() {
            if (this.state.responseError) {
                return(
                    <Alert className="text-center" id="QuerySuccesfully" bsStyle="danger">
                        Your session has <strong>expired</strong> or the system is <strong>not available</strong> 
                    </Alert>)
            }else if(this.state.travels){
                var ArrayTravel = this.state.travels;

                return (
                    <div>
                    <BootstrapTable data={ ArrayTravel } remote={this.remote} search pagination exportCSV
                        tableStyle={ { border: '#0000FF 2.5px solid' } }>
                        <TableHeaderColumn width={'35px'} dataField="any" dataFormat={this.indexNumber}>#</TableHeaderColumn>
                        <TableHeaderColumn isKey hiddenOnInsert={true} dataField='id'>Id de viaje</TableHeaderColumn>
                        <TableHeaderColumn dataField='status'>Estado</TableHeaderColumn>
                        <TableHeaderColumn dataField='price'>Precio</TableHeaderColumn>
                        <TableHeaderColumn dataField='createdAt' dataFormat={this.showDateFormat}>Fecha</TableHeaderColumn>
                        <TableHeaderColumn dataField='userId'>Id de usuario</TableHeaderColumn>
                        <TableHeaderColumn dataField='from'dataFormat={this.showNameLocation}>Desde</TableHeaderColumn>
                        <TableHeaderColumn dataField='to' dataFormat={this.showNameLocation}>Hasta</TableHeaderColumn>
                    </BootstrapTable>
                </div>
                );
            }else{
                return <p className="text-center">Loading...</p>
            }
    }
}