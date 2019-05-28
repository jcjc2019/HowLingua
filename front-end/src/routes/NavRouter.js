//NOT WORKING NOW.
//should REMOVE ALL Routes here.

import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const NavRoutes = [
    {
        path: "/main", //put the path for the component here
        exact: true,
        main: () => {MainContainer}
    },
    {
        path: "/languages",
        main: () => {LanguageCards}
    },
    {
        path: "/topics",
        main: () => {TopicContainer}
    },
    {
        path: "/signup",
        main: ()=> {SignupContainer}
    },
    {
        path: "/login",
        main: ()=> {LoginContainer}
    }
];

function NavBarRouter() {
    return (
        <Router>
            <div style={{ display: "flex" }}>
                <div
                    style={{
                        padding: "10px",
                        width: "40%",
                        background: "#f0f0f0"
                    }}
                >
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/bubblegum">Bubblegum</Link>
                        </li>
                        <li>
                            <Link to="/shoelaces">Shoelaces</Link>
                        </li>
                    </ul>

                    {NavRoutes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                        />
                    ))}
                </div>

                <div style={{ flex: 1, padding: "10px" }}>
                    {NavRoutes.map((route, index) => (
                        // Render more <Route>s with the same paths as
                        // above, but different components this time.
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            component={route.main}
                        />
                    ))}
                </div>
            </div>
        </Router>
    );
}

export default NavDrawerRouter;
