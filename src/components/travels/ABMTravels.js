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

    /*updateTravel(data) {
        var config = {
            headers: { 'Authorization': Auth.getToken() }
        };

        let currentComponent = this;
        var link = ApiLinks.Travels + "/" + data.id;

        Axios
            .put(link, data, config)
            .then(function (response) {
                currentComponent.setState({ travel: response.data });
            })
            .catch(function (error) {
                currentComponent.setState({ responseError: true });
                console.log(error);
                alert("Error to update Travel");
            });
        this.setState({row:""});
    }*/

    applyFilters(data) {
        //showResults(data);
        this.setState({dataFilters:data});
    }

    render() {
        return (
            <div>
                <FiltersTravel applyFilters={this.applyFilters.bind(this)}></FiltersTravel>
                <TravelTable
                    {...this.state} />
            </div>
      );
    }
}