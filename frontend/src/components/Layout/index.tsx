import React, {Component} from 'react';
import {Container, CssBaseline, Toolbar} from "@material-ui/core";
import Header from "./Header";
import connectReducers from "../../utils/connectReducers";
import {graphql} from '../../utils/graphql'
import {gql} from "@apollo/client";

class Layout extends Component<any> {
    async componentDidMount() {
        if (!this.props.user && localStorage.getItem('token')) {
            const user = (await graphql(gql`
            query {
                me {
                    user {
                        id
                        tag
                        username
                    }
                }
            }
            `))
            if (user && user.me) {
                this.props.setUser(user.me)
                console.log(user.me)
            }
        }
    }

    render() {
        return (
            <>
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
            </>
        );
    }
}

export default connectReducers(Layout)