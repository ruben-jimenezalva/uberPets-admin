import React from "react";
import Users from "./ABMUsers";
import "./UserApp.css"


class UserApp extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="home-page">

                <div className="userBar">
                    <h2 className="titleUserBar">Usuarios</h2>
                </div>

                <div className="UserView">
                    <Users/>
                </div>

            </div>
        );
    }
}

  export default (UserApp);
