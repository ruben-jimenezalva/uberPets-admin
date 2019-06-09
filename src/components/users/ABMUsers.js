import React from "react";
import Axios from "axios";
import ApiLinks from "../../utils/ApiLinks";
import Auth from "../../utils/auth";
import UserTable from "./UserTable";
import FiltersUser from "./FiltersUser";

export default class ABMUser extends React.Component {
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
                <FiltersUser applyFilters={this.applyFilters.bind(this)}>></FiltersUser>
                <UserTable {...this.state} />
            </div>
      );
    }
}