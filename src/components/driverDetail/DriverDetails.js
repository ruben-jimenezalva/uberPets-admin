import React from "react";
import ProfileDriver from "./ProfileDriver";
import TabDriver from "./TabDriver";

import Axios from "axios";
import ApiLinks from "../../utils/ApiLinks";
import Auth from "../../utils/auth";

class DriverDetails extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div >
                <ProfileDriver driverId={this.props.match.params.id} />
                <TabDriver driverId={this.props.match.params.id} bsStyle="tabs" className="tabDriver" block ></TabDriver>
            </div>
        );
    }
}

  export default (DriverDetails);
