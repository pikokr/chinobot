import React, {Component} from 'react';
import Layout from "../../../components/Layout";
import {graphql} from "../../../utils/graphql";
import {gql} from "@apollo/client";
import {Typography} from "@material-ui/core";

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
                {
                    guild === null ? '로딩중..' : guild === false ? <div>
                        이 페이지는 다음 이유로 표시되지 않았습니다.
                        <Typography>
                            서버가 존재하지 않음
                        </Typography>
                        <Typography>
                            로그인하지 않음
                        </Typography>
                        <Typography>
                            봇이 서버에 없음
                        </Typography>
                        <Typography>
                            유저에게 관리자 권한이 없음
                        </Typography>
                    </div> : '대시보드'
                }
            </Layout>
        );
    }
}

export default Dashboard;