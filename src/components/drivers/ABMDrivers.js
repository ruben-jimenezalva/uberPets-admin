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
        }
    }

    onCellEdit(row) {
        this.setState({row:row});
    }

    /*updateDriver(data) {
        var config = {
            headers: { 'Authorization': Auth.getToken() }
        };

        let currentComponent = this;
        var link = ApiLinks.Drivers + "/" + data.id;

        Axios
            .put(link, data, config)
            .then(function (response) {
                currentComponent.setState({ driver: response.data });
            })
            .catch(function (error) {
                currentComponent.setState({ responseError: true });
                console.log(error);
                alert("Error to update Driver");
            });
        this.setState({row:""});
    }*/

    render() {
        return (
            <div>
            <FiltersDriver></FiltersDriver>
            <DriverTable
                onCellEdit={this.onCellEdit.bind(this)}
                {...this.state} />
            </div>
      );
    }
}