import React from "react";
import ProfileUser from "./ProfileUser";
import TabUser from "./TabUser";

import Axios from "axios";
import ApiLinks from "../../utils/ApiLinks";
import Auth from "../../utils/auth";

class UserDetails extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div >
                <ProfileUser userId={this.props.match.params.id} />
                <TabUser userId={this.props.match.params.id} bsStyle="tabs" className="tabUser" block ></TabUser>
            </div>
        );
    }
}

  export default (UserDetails);
