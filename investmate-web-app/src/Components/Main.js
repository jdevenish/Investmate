import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect} from 'react-router-dom';
import Home from "./Home";
import Favs from "./Favs";
import Research from "./Research";
import Details from "./Details";

function Main() {

    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/favs" component={Favs} />
            <Route path="/research" component={Research} />
            <Route path="/details/:symbl" component={Details}  />
            <Redirect to="/" />
        </Switch>
    );
}

export default Main;
