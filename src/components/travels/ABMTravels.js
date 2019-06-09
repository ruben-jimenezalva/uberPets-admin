import React from "react";
import Axios from "axios";
import ApiLinks from "../../utils/ApiLinks";
import Auth from "../../utils/auth";
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';
import TravelTable from "./TravelTable";
import FiltersTravel from "./FiltersTravel";

export default class ABMTravel extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            row: "",
            dataFilters:""
        }
    }

    onCellEdit(row) {
        this.setState({row:row});
    }

    applyFilters(data) {
        this.setState({dataFilters:data});
    }

    render() {
        return (
            <div>
                <FiltersTravel applyFilters={this.applyFilters.bind(this)}></FiltersTravel>
                <TravelTable {...this.state} />
            </div>
      );
    }
}