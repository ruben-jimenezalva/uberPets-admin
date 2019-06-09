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
        }
    }

    onCellEdit(row) {
        this.setState({row:row});
    }

    /*updateUser(data) {
        var config = {
            headers: { 'Authorization': Auth.getToken() }
        };

        let currentComponent = this;
        var link = ApiLinks.Users + "/" + data.id;

        Axios
            .put(link, data, config)
            .then(function (response) {
                currentComponent.setState({ user: response.data });
            })
            .catch(function (error) {
                currentComponent.setState({ responseError: true });
                console.log(error);
                alert("Error to update User");
            });
        this.setState({row:""});
    }*/

    render() {
        return (
            <div>
            <FiltersUser></FiltersUser>
            <UserTable
                onCellEdit={this.onCellEdit.bind(this)}
                {...this.state} />
            </div>
      );
    }
}