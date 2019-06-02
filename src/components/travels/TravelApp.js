import React from "react";
import Travels from "./ABMTravels";
import "./TravelApp.css"


class TravelApp extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="home-page">

                <div className="travelBar">
                    <h2 className="titleTravelBar">Travels</h2>
                </div>

                <div className="TravelView">
                    <Travels/>
                </div>

            </div>
        );
    }
}

  export default (TravelApp);
