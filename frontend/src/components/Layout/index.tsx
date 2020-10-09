import React, {Component} from 'react';
import {Container, CssBaseline, Toolbar} from "@material-ui/core";
import {Provider} from "react-redux";
import {createStore} from 'redux'
import reducers from '../../reducers'
import Header from "./Header";
const store = createStore(reducers)

class Layout extends Component {
    render() {
        return (
            <Provider store={store}>
                <CssBaseline/>
                <Header/>
                <Toolbar/>
                <Container>
                    <div style={{
                        paddingTop: 10
                    }}>
                        {this.props.children}
                    </div>
                </Container>
            </Provider>
        );
    }
}

export default Layout;