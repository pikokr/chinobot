import React from 'react';
import {Switch, Route} from "react-router-dom";
import routes from "./routes";

const Router = () => {
    return (
        <Switch>
            {
                routes.map((route, i) => (
                    // @ts-ignore
                    <Route key={i} {...route}/>
                ))
            }
        </Switch>
    );
};

export default Router;