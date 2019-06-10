import React from 'react';
import Axios from "axios";
import ApiLinks from "../../utils/ApiLinks";
import Auth from "../../utils/auth";
import {Alert} from 'react-bootstrap';

import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

var ReactBsTable  = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;

export default class RatingDriverRecievedTable extends React.Component {
    constructor(props) {
        super(props)
        this.state3 = { 
            driverScores: "",
            responseError: false,
            responseSuccessfully: false,
        };
    }

    componentWillMount() {

        let toId = "toId="+this.props.driverId;
        var path =ApiLinks.DriverScores+"/?"+toId;

        this.setState({responseError: false});
        var config = {
            headers: { 'Authorization':Auth.getToken() }
        };

        let currentComponent = this;
        Axios
            .get(path, config)
            .then(function (response) {
                currentComponent.setState({driverScores: response.data});
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
                currentComponent.setState({responseError: true});                
            });
    }

    indexNumber(cell, row, enumObject, rowIndex) { return (<div>{rowIndex + 1}</div>) }

    render() {
        if (this.state3.responseError) {
            return(
                <Alert className="text-center" id="QuerySuccesfully" bsStyle="danger">
                    Your session has <strong>expired</strong> or the system is <strong>not available</strong> 
                </Alert>)
        }else if(this.state3.driverScores){
            var arrayDriverScores = this.state3.driverScores;

            return (
                <div>
                <BootstrapTable data={ arrayDriverScores } remote={this.remote} search pagination exportCSV
                    tableStyle={ { border: '#0000FF 2.5px solid' } }>
                    <TableHeaderColumn width={'35px'} dataField="any" dataFormat={this.indexNumber}>#</TableHeaderColumn>
                    <TableHeaderColumn dataField='fromId'>Id de usuario</TableHeaderColumn>
                    <TableHeaderColumn dataField='createdAt'>Fecha</TableHeaderColumn>
                    <TableHeaderColumn dataField='comment' >Comentario</TableHeaderColumn>
                    <TableHeaderColumn dataField='value' >Puntaje</TableHeaderColumn>
                </BootstrapTable>
            </div>
            );
        }else{
            return <p className="text-center">Loading...</p>
        }
    }
}