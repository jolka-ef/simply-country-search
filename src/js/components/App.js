import React from "react";
import ReactDOM from 'react-dom';

import {
    HashRouter as Router,
    Switch,
    Route
} from "react-router-dom"

import {Search} from "./Search";
import {Country} from "./Country";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Search} />
                <Route path="/country/:countryName" component={Country} />
            </Switch>
        </Router>
    );
}

export default App;
