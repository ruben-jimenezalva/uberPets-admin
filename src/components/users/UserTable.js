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

export default class UserTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = { users: "",
            responseError: false,
            responseSuccessfully: false,
        };
    }

    componentWillReceiveProps(nextProps){
        this.componentWillMount(nextProps.dataFilters);    
    }

    componentWillMount(data) {
        
        var path =ApiLinks.Users;
        if (data != undefined ||  data != null){
            let name = data.name ==""? "":"name="+data.name;
            let status = data.status ==""? "":"status="+data.status;
            let minScore = data.minScore ==""? "":"minScore="+data.minScore;
            let maxScore = data.maxScore ==""? "":"maxScore="+data.maxScore;

            if(name != "" || status != "" || minScore != "" || maxScore != "" ){
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
                currentComponent.setState({users: response.data});
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
                currentComponent.setState({responseError: true});                
            });
    }


    cellButton(cell, row, enumObject, rowIndex) {
        return (
            <button type="button" title="Edit User" className="btn btn-success" onClick={() => this.onClickEditUser(cell, row, rowIndex)}>
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

    showScore = (cell, row) => {
        let score = row.totalScore;
        if(row.scoreQuantity != 0)
            score /= row.scoreQuantity;
        return Number((score).toFixed(1));
    }

    linkedName = (cell, row) => {
        const cellAux = this.showName(cell, row);
        return (
            <Link to={{ pathname:'/users/'+row.id}} >
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
            }else if(this.state.users){
                var ArrayUser = this.state.users;
                return (
                    <div>
                    <BootstrapTable data={ ArrayUser } remote={this.remote} search pagination exportCSV
                        tableStyle={ { border: '#0000FF 2.5px solid' } }>
                        <TableHeaderColumn width={'35px'} dataField="any" dataFormat={this.indexNumber}>#</TableHeaderColumn>
                        <TableHeaderColumn isKey hiddenOnInsert={true} dataField='id'>Id de chofer</TableHeaderColumn>
                        <TableHeaderColumn dataField='name' dataFormat={this.linkedName}>Nombre</TableHeaderColumn>
                        <TableHeaderColumn dataField='dni' dataFormat={this.showDocument}>Documento</TableHeaderColumn>
                        <TableHeaderColumn dataField='status'>Estado</TableHeaderColumn>
                        <TableHeaderColumn dataFormat={this.showScore}>Puntaje</TableHeaderColumn>
                    </BootstrapTable>
                </div>
                );
            }else{
                return <p className="text-center">Loading...</p>
            }
    }
}