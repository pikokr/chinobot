import React, {Component} from 'react';
import Layout from "../../../components/Layout";
import {graphql} from "../../../utils/graphql";
import {gql} from "@apollo/client";
import GuildContainer from "../../../components/GuildContainer";

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
                    id
                    name
                }
            }
        `)
        if (data.guild) {
            this.setState({
                guild: data.guild
            })
        } else {
            this.setState({
                guild: false
            })
        }
    }

    render() {
        const {guild} = this.state

        return (
            <Layout>
                <GuildContainer guild={guild}>
                    준비중입니다
                </GuildContainer>
            </Layout>
        );
    }
}

export default Dashboard;