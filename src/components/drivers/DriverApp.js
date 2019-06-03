import React from "react";
import Drivers from "./ABMDrivers";
import "./DriverApp.css"


class DriverApp extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="home-page">

                <div className="driverBar">
                    <h2 className="titleDriverBar">Choferes</h2>
                </div>

                <div className="DriverView">
                    <Drivers/>
                </div>

            </div>
        );
    }
}

  export default (DriverApp);
