import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import TableTravelsUser from "./TableTravelsUser";
import TableRatingUserRecieved from "./TableRatingUserReceived";
import TableRatingUserSended from "./TableRatingUserSended";

import "./TabUser.css";

class TabUser extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <Tabs defaultActiveKey={1} id="uncontrolled-tab">
                    <Tab eventKey={1} title="Viajes">
                        <br/>
                        <TableTravelsUser userId={this.props.userId}></TableTravelsUser>
                    </Tab>
                    <Tab eventKey={2} title="Puntuaciones recibidas">
                        <br/>
                        <TableRatingUserRecieved userId={this.props.userId}></TableRatingUserRecieved>
                    </Tab>
                    <Tab eventKey={3} title="Puntuaciones enviadas">
                        <br/>
                        <TableRatingUserSended userId={this.props.userId}></TableRatingUserSended>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default (TabUser);
