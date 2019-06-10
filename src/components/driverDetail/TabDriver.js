import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import TableTravelsDriver from "./TableTravelsDriver";
import TableRatingDriverRecieved from "./TableRatingDriverReceived";
import TableRatingDriverSended from "./TableRatingDriverSended";

import "./TabDriver.css";

class TabDriver extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <Tabs defaultActiveKey={1} id="uncontrolled-tab">
                    <Tab eventKey={1} title="Viajes">
                        <br/>
                        <TableTravelsDriver driverId={this.props.driverId}></TableTravelsDriver>
                    </Tab>
                    <Tab eventKey={2} title="Puntuaciones recibidas">
                        <br/>
                        <TableRatingDriverRecieved driverId={this.props.driverId}></TableRatingDriverRecieved>
                    </Tab>
                    <Tab eventKey={3} title="Puntuaciones enviadas">
                        <br/>
                        <TableRatingDriverSended driverId={this.props.driverId}></TableRatingDriverSended>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default (TabDriver);
