import React from 'react';
import Router from "./router";
import {CssBaseline} from "@material-ui/core";
import Layout from "./components/Layout";

const App = () => {
    return (
        <>
        <CssBaseline/>
        <Router/>
        </>
    );
};

export default App;