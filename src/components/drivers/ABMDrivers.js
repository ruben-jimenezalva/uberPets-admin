import React from "react";
import Axios from "axios";
import ApiLinks from "../../utils/ApiLinks";
import Auth from "../../utils/auth";
import FiltersDriver from "./FiltersDriver";
import DriverTable from "./DriverTable";

export default class ABMDriver extends React.Component {
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
                <FiltersDriver applyFilters={this.applyFilters.bind(this)}></FiltersDriver>
                <DriverTable {...this.state}/>
            </div>
      );
    }
}