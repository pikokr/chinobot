import React, {Component} from 'react';
import {Typography} from "@material-ui/core";
import ShardInfo from "./ShardInfo";
import {graphql} from "../../utils/graphql";
import {gql} from "@apollo/client";
import Layout from "../../components/Layout";

class Status extends Component {
    state = {
        shards: null
    }

    async componentDidMount() {
        this.setState({
            shards: (await graphql(gql`
                query {
                    status {
                        shards {
                            guilds
                            id
                            online
                            users
                        }
                    }
                }
            `)).status.shards
        })
    }

    render() {
        return (
            <Layout>
                <Typography variant="h4">
                    치노봇 상태
                </Typography>
                <Typography variant="subtitle2">
                    여기에서 치노봇의 상태를 확인하실 수 있습니다.
                </Typography>
                <p/>
                <Typography variant="h6">
                    샤드 정보
                </Typography>
                {
                    this.state.shards && (
                        <ShardInfo data={this.state.shards}/>
                    )
                }
            </Layout>
        );
    }
}

export default Status;