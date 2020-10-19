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
                        avatar
                    }
                }
            }
            `))
            if (user && user.me) {
                if (!user.me.user) {
                    localStorage.removeItem('token')
                    return
                }
                this.props.setUser(user.me)
                this.props.updateSession({
                    loading: false
                })
            }
        } else {
            this.props.updateSession({
                loading: false
            })
        }
    }

    render() {
        return (
            <>
                <CssBaseline/>
                <Header/>
                <Toolbar/>
                {
                    this.props.noContainer ? this.props.children : <Container>
                        <div style={{
                            paddingTop: 10,
                            width: '100%'
                        }}>
                            {this.props.children}
                        </div>
                    </Container>
                }
            </>
        );
    }
}

export default connectReducers(Layout)