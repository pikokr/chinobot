import React from 'react';
import {Switch, Route} from "react-router-dom";
import routes from "./routes";
import NotFound from "../views/NotFound";
import Home from "../views/Home";
import Status from "../views/Status";
import AuthCallback from "../views/AuthCallback";
import Servers from "../views/Servers";
import InviteCallback from "../views/InviteCallback";
import Dashboard from "../views/Servers/Dashboard";
import Toggle from "../views/Servers/Dashboard/Toggle";
import List from "../views/Servers/Dashboard/List";
import Warns from "../views/Servers/Dashboard/Warns";
import ServerListDetails from "../views/ServerListDetails";

const Router = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/status" component={Status}/>
            <Route exact path="/auth/callback" component={AuthCallback}/>
            <Route exact path="/servers" component={Servers}/>
            <Route exact path="/invite/callback" component={InviteCallback}/>
            <Route exact path="/servers/:id" component={Dashboard}/>
            <Route exact path="/servers/:id/toggle" component={Toggle}/>
            <Route exact path="/servers/:id/list" component={List}/>
            <Route exact path="/servers/:id/warns" component={Warns}/>
            <Route exact path="/server/:id" component={ServerListDetails}/>
            <Route component={NotFound}/>
        </Switch>
    );
};

export default Router;