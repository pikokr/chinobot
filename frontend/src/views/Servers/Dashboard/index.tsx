import React, {Component} from 'react';
import Layout from "../../../components/Layout";
import {graphql} from "../../../utils/graphql";
import {gql} from "@apollo/client";

class Dashboard extends Component<any> {
    state: {
        guild: any
    } = {
        guild: null
    }

    async componentDidMount() {
        const data = await graphql(gql`
            query {
                guild(id: "${this.props.match.params.id.replace('"', '\\"')}") {
                    icon
                    channels
                    icon
                    name
                    roles
                }
            }
        `)
        this.setState({
            guild: data
        })
    }

    render() {
        return (
            <Layout>
                대시보드
            </Layout>
        );
    }
}

export default Dashboard;