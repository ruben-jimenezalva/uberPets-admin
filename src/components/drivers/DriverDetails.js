import React from "react";
import "./DriverApp.css"

class DriverDetails extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="home-page">

                <div className="driverBar">
                    <h2 className="titleDriverBar">Detalle de Chofer</h2>
                </div>

                <div className="DriverView">
                    <h1>Aca deberia estar un detalle</h1>
                </div>

            </div>
        );
    }
}

  export default (DriverDetails);
