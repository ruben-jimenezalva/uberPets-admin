import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import TableTravelsDriver from "./TableTravelsDriver";
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
                        Tab 2 content
                    </Tab>
                    <Tab eventKey={3} title="Puntuaciones enviadas">
                        Tab 3 content
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default (TabDriver);
