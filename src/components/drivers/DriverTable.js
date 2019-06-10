import React from 'react';
import Axios from "axios";
import ApiLinks from "../../utils/ApiLinks";
import Auth from "../../utils/auth";
import {Alert} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

var ReactBsTable  = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;

export default class DriverTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = { drivers: "",
            responseError: false,
            responseSuccessfully: false,
        };
    }

    componentWillReceiveProps(nextProps){
        this.componentWillMount(nextProps.dataFilters);    
    }

    componentWillMount(data) {

        var path =ApiLinks.Drivers;
        if (data != undefined ||  data != null){
            let name = data.name ==""? "":"name="+data.name;
            let status = data.status ==""? "":"status="+data.status;
            let minScore = data.minScore ==""? "":"minScore="+data.minScore;
            let maxScore = data.maxScore ==""? "":"maxScore="+data.maxScore;
            let plate = data.plate ==""? "":"plate="+data.plate;
            console.log(plate);
            if(name != "" || status != "" || minScore != "" || maxScore != "" || plate != ""){
                path = path+"/?";
                let originalPath = path;

                if(name != "" )
                    path = path + name;
    
                if(status != "" && originalPath != path)
                    path = path+"&"+status;
                else if (status!= "")
                    path = path + status;
    
                if(minScore != "" && originalPath != path)
                    path = path+"&"+minScore;
                else if (minScore!= "")
                    path = path + minScore;
    
                if(maxScore != "" && originalPath != path)
                    path = path+"&"+maxScore;
                else if (maxScore!= "")
                    path = path + maxScore;

                if(plate != "" && originalPath != path)
                    console.log(path);
                else if (plate!= "") 
                    path = path + plate;
                    
            }
        }


        this.setState({responseError: false});
        var config = {
            headers: { 'Authorization':Auth.getToken() }
        };

        let currentComponent = this;

        Axios
            .get(path, config)
            .then(function (response) {
                currentComponent.setState({drivers: response.data});
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
                currentComponent.setState({responseError: true});                
            });
    }


    cellButton(cell, row, enumObject, rowIndex) {
        return (
            <button type="button" title="Edit Driver" className="btn btn-success" onClick={() => this.onClickEditDriver(cell, row, rowIndex)}>
                Edit
            </button>
        )
     }


    onClickEditTravel(cell, row, rowIndex){
        this.props.onCellEdit(row);
    }

    indexNumber(cell, row, enumObject, rowIndex) { return (<div>{rowIndex + 1}</div>) }

    showName(cell, row) {
        return row.party.name;
    }
    showDocument(cell, row) {
        return row.party.dni;
    }
    showBrand(cell, row) {
        return row.vehicle == null ? "" : row.vehicle.brand;
    }
    showModel(cell, row) {
        return row.vehicle == null ? "" : row.vehicle.model;
    }
    showPlate(cell, row) {
        return row.vehicle == null ? "" : row.vehicle.licensePlate;
    }
    showColor(cell, row) {
        return row.vehicle == null ? "" : row.vehicle.color;
    }
    linkedName = (cell, row) => {
        const cellAux = this.showName(cell, row);
        return (
            <Link to={{ pathname:'/drivers/'+row.id}} >
            {cellAux}
            </Link>
        )
    }

    render() {
            if (this.state.responseError) {
                return(
                    <Alert className="text-center" id="QuerySuccesfully" bsStyle="danger">
                        Your session has <strong>expired</strong> or the system is <strong>not available</strong> 
                    </Alert>)
            }else if(this.state.drivers){
                var ArrayDriver = this.state.drivers;
                return (
                    <div>
                    <BootstrapTable data={ ArrayDriver } remote={this.remote} search pagination exportCSV
                        tableStyle={ { border: '#0000FF 2.5px solid' } }>
                        <TableHeaderColumn width={'35px'} dataField="any" dataFormat={this.indexNumber}>#</TableHeaderColumn>
                        <TableHeaderColumn isKey hiddenOnInsert={true} dataField='id'>Id de chofer</TableHeaderColumn>
                        <TableHeaderColumn dataField='name' dataFormat={this.linkedName}>Nombre</TableHeaderColumn>
                        <TableHeaderColumn dataField='dni' dataFormat={this.showDocument}>Documento</TableHeaderColumn>
                        <TableHeaderColumn dataField='plate' dataFormat={this.showPlate}>Patente</TableHeaderColumn>
                        <TableHeaderColumn dataField='brand' dataFormat={this.showBrand}>Marca</TableHeaderColumn>
                        <TableHeaderColumn dataField='model' dataFormat={this.showModel}>Modelo</TableHeaderColumn>
                        <TableHeaderColumn dataField='color' dataFormat={this.showColor}>Color</TableHeaderColumn>
                        <TableHeaderColumn dataField='status'>Estado</TableHeaderColumn>
                        <TableHeaderColumn dataField='travelAmount'>Cant. de viajes</TableHeaderColumn>
                        <TableHeaderColumn dataField='totalScore'>Puntaje</TableHeaderColumn>
                    </BootstrapTable>
                </div>
                );
            }else{
                return <p className="text-center">Loading...</p>
            }
    }
}